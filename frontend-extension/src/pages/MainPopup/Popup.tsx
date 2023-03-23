import { useState } from "react";
import "./Popup.css";

import ExtensionLayout from "../../layouts/ExtensionLayout/ExtensionLayout";
import Landing from "../Landing/Landing";
import Wallet from "../Wallet/Wallet";
import Login from "../Login/Login";
import PendingLogin from "../PendingLogin/PendingLogin";

import Signature from "../Signature/Signature";

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
  const [loggedIn, setLogin] = useState(true); // Tracks login state
  const [walletInit, setInit] = useState(false); // Tracks if a wallet has been init on extension
  const [landingAction, setLandingAction] = useState("abort"); // Tracks if Create Wallet was called from Landing

  chrome.runtime.sendMessage({ checkState: true });
  chrome.runtime.onMessage.addListener(async function (message) {
    if (message.initValid) {
      setInit(true);
    } else if (message.initInvalid) {
      setInit(false);
    }
    if (message.isLoggedIn) {
      setLogin(true);
    } else if (message.isLoggedOut) {
      setLogin(false);
    }
  });

  // Pass this to child components to be able to reflect conditional render changes
  // This is the alternative to routing (render certain page components based on these states)
  const handleLogin = async () => {
    // We wait for a message from background.js of whether auth0 login was successful or not
    // The background.js script would also likely be responsible for setting chrome session storage to allow for
    // persistent login while the browser is still open.
    chrome.runtime.sendMessage({ loginAuth0: true });
    chrome.runtime.onMessage.addListener(async function (message) {
      if (message.loginSuccess) {
        setLogin(true);
        setInit(true);
      } else if (message.loginFailed) {
        setLandingAction("abort");
        setLogin(false);
        setInit(false);
      }
    });
  };

  const handleLogout = async () => {
    chrome.runtime.sendMessage({ logoutAuth0: true });
    chrome.runtime.onMessage.addListener(async function (message) {
      if (message.logoutSuccess) {
        setLogin(false);
      }
    });
  };

  // Called from Landing page to update wallet status
  // Upon successful create/import set states and show wallet
  // Possible options for action: 'create', 'import', 'abort'
  const handleLanding = (action: string) => {
    setLandingAction(action);
  };

  // Active means a wallet is instantiated for extension via login auth0
  // When resetWallet is called then we reset the wallet and go back to landing page
  // Handle any chrome session storage cleaning here
  const resetWallet = () => {
    chrome.runtime.sendMessage({ resetAuth0: true });
    setInit(false);
    setLogin(false);
    setLandingAction("abort");
  };

  // Return the page to render into the layout based on wallet state
  const renderState = () => {
    return <Signature />;
    if (walletInit) {
      if (loggedIn) {
        return <Wallet handleLogout={handleLogout} resetWallet={resetWallet} setLanding={handleLanding} />;
      } else {
        return <Login resetWallet={resetWallet} setLogin={handleLogin} setLanding={handleLanding} />;
      }
    } else {
      switch (landingAction) {
        // Login from landing displays a pending page, opening up the auth0 popup
        // After successful auth0 login redirects to wallet page Else returns to landing upon cancel/fail
        case "login":
          return <PendingLogin handleLogin={handleLogin} setLanding={handleLanding} resetWallet={resetWallet} />;
        default:
          return <Landing handleLogin={handleLogin} setLanding={handleLanding} />;
      }
    }
  };

  return <ExtensionLayout>{renderState()}</ExtensionLayout>;
}
