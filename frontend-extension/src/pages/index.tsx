import Head from "next/head";
import { useState } from "react";
import ExtensionLayout from "@/layouts/ExtensionLayout/ExtensionLayout";

import Landing from "./Landing/Landing";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import ImportWallet from "./Import/ImportWallet";
import Wallet from "./Wallet/Wallet";

export default function Home() {
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

  // These states would be set after checking cookies / auth0 to set initial values
  const [loggedIn, setLogin] = useState(true); // Tracks login state
  const [walletInit, setInit] = useState(false); // Tracks if a wallet has been init on extension
  const [landingAction, setLandingAction] = useState("abort"); // Tracks if Create Wallet was called from Landing

  // Pass this to child components to be able to reflect conditional render changes
  // This is the alternative to routing (render certain page components based on these states)
  const handleLogin = (state: boolean) => {
    setLogin(state);
  };

  // Called from Landing page to update wallet status
  // Upon successful create/import set states and show wallet
  // Possible options for action: 'create', 'import', 'abort'
  const handleLanding = (action: string) => {
    setLandingAction(action);
  };

  // Active means a wallet is instantiated for extension via login auth0
  // When activeWallet(false) is called then we reset the wallet and go back to landing page
  const activeWallet = (state: boolean) => {
    setInit(state);
    setLogin(state);
    setLandingAction("abort");
  };

  // Return the page to render into the layout
  const renderState = () => {
    if (walletInit) {
      if (loggedIn) {
        return <Wallet setLogin={handleLogin} activeWallet={activeWallet} setLanding={handleLanding} />;
      } else {
        return <Login setLogin={handleLogin} setLanding={handleLanding} />;
      }
    } else {
      switch (landingAction) {
        case "create": // Just redirect to novusys website onboarding for wallet init
          return <SignUp setLogin={handleLogin} activeWallet={activeWallet} setLanding={handleLanding} />;
        case "import": // Login via auth0 after signing up on website
          return <ImportWallet setLogin={handleLogin} activeWallet={activeWallet} setLanding={handleLanding} />;
        default:
          return <Landing setLanding={handleLanding} />;
      }
    }
  };

  return (
    <>
      <Head>
        <title>novusys wallet</title>
        <meta name="description" content="A wallet that grows with you." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ExtensionLayout>{renderState()}</ExtensionLayout>
    </>
  );
}
