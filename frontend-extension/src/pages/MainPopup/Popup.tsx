import { useState, useContext, createContext, useEffect } from "react";
import "./Popup.css";

import ExtensionLayout from "../../layouts/ExtensionLayout/ExtensionLayout";
import Landing from "../Landing/Landing";
import Wallet from "../Wallet/Wallet";
import Login from "../Login/Login";
import PendingLogin from "../PendingLogin/PendingLogin";

import Signature from "../Signature/Signature";
import TxnPending from "../TransactionPending/TransactionPending";
import Transfer from "../Transfer/Transfer";
import CreateTransfer from "../CreateTransfer/CreateTransfer";

interface UserContextValues {
  auth0id: string;
  name: string;
  avatar: string;
  email: string;
}

const LandingCtx = createContext({ landingAction: "signup", setLandingAction: (state: string) => {} });
const UserCtx = createContext<UserContextValues>({
  auth0id: "1",
  name: "Account 1",
  avatar: "/images/defaultaccount.png",
  email: "example@email.com",
});

export default function App() {
  /**
   * Idea is to use Chrome cookies to detect different states of the extension
   * 1. Logged in => Show main screen with balance, action buttons, and signers/activity
   * 2. Not logged in => Show password screen to unlock => Show main screen with " "
   * 3. Wallet not initialized => Show Landing Page to Create/Import a wallet
   *
   * Conditionally render certain components differently based on state of the extension
   * This was my approach to being able to render components differently based on state.
   * Feel free to let me know if there's a better way.
   *
   * Current Flow:
   * - User Sign Up => novusys website onboarding (no wallet creation within extension)
   * - User Login => auth0 authentication to 'import' wallet
   * - Existing wallet registered with extension => Local PW Login to unlock wallet
   * - Reset wallet registered => wipe and reset to landing page
   *
   */

  // These states would be set after checking chrome session storage and is set by background.js auth0 flow
  const [loggedIn, setLogin] = useState(false); // Tracks login state
  const [walletInit, setInit] = useState(false); // Tracks if a wallet has been init on extension
  const [landingAction, setLandingAction] = useState("signup");
  const [user, setUser] = useState({
    auth0id: "1",
    name: "Account 1",
    avatar: "/images/defaultaccount.png",
    email: "example@email.com",
  });

  useEffect(() => {
    chrome.runtime.sendMessage({ checkState: true });
    chrome.runtime.onMessage.addListener(async function (message) {
      if (message.initValid) {
        setInit(true);
      } else if (message.initInvalid) {
        setInit(false);
      }
      if (message.isLoggedIn) {
        setLogin(true);
        setLandingAction("wallet");
      } else if (message.isLoggedOut) {
        setLogin(false);
      }
    });
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const userWrapper = await chrome.storage.session.get("USER_DATA");
      const data = userWrapper.USER_DATA;
      if (!data)
        return {
          auth0id: "1",
          name: "Account 1",
          avatar: "/images/defaultaccount.png",
          email: "example@email.com",
        };
      return { auth0id: data.sub, name: data.nickname, avatar: data.picture, email: data.email };
    }

    fetchUser()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  const handleLogin = async () => {
    // We wait for a message from background.js of whether auth0 login was successful or not
    // The background.js script is responsible for setting chrome session storage to allow for
    // persistent login while the browser is still open.
    setLandingAction("loginPending");
    chrome.runtime.sendMessage({ loginAuth0: true });
    chrome.runtime.onMessage.addListener(async function (message) {
      if (message.loginSuccess) {
        setInit(true);
        const hasOverride = await chrome.storage.session.get("EXTERNAL_OVERRIDE");
        if (hasOverride && hasOverride.EXTERNAL_OVERRIDE) {
          setLandingAction(hasOverride.EXTERNAL_OVERRIDE);
        } else {
          setLandingAction("wallet");
        }
        setLogin(true);
      } else if (message.loginFailed) {
        setLogin(false);
        setInit(false);
        setLandingAction("abort");
      }
    });
  };

  const handleLogout = async () => {
    chrome.runtime.sendMessage({ logoutAuth0: true });
    chrome.runtime.onMessage.addListener(async function (message) {
      if (message.logoutSuccess) {
        setLandingAction("abort");
        setLogin(false);
      }
    });
  };

  // Active means a wallet is instantiated for extension via login auth0
  // When resetWallet is called then we reset the wallet and go back to landing page
  // Chrome session/local storage cleared (handled in background service worker)
  const resetWallet = () => {
    chrome.runtime.sendMessage({ resetAuth0: true });
    setInit(false);
    setLogin(false);
    setLandingAction("abort");
  };

  // useContext is being used to pass down the setLandingAction to child pages
  // These child pages will utilize the context to update the landingAction string
  // This landingAction string dictates which page to render in the main popup
  // Much easier than having to constantly pass down the function as a prop
  const renderState = () => {
    if (walletInit) {
      switch (landingAction) {
        case "pendingTransaction":
          return <TxnPending />;
        case "transfer":
          return <Transfer />;
        case "createTransfer":
          return <CreateTransfer />;
        case "wallet":
          if (loggedIn) {
            return <Wallet handleLogout={handleLogout} />;
          } else {
            return <Login resetWallet={resetWallet} setLogin={handleLogin} />;
          }
        case "loginPending":
          return <PendingLogin auth0PopUp={false} />;
        default:
          return <Login resetWallet={resetWallet} setLogin={handleLogin} />;
      }
    } else {
      switch (landingAction) {
        case "loginPending":
          return <PendingLogin auth0PopUp={true} />;
        default:
          return <Landing handleLogin={handleLogin} />;
      }
    }
  };

  return (
    <UserCtx.Provider value={user}>
      <ExtensionLayout>
        <LandingCtx.Provider value={{ landingAction, setLandingAction }}>{renderState()}</LandingCtx.Provider>
      </ExtensionLayout>
    </UserCtx.Provider>
  );
}

export { LandingCtx };
export { UserCtx };
