import Head from "next/head";
import { useState } from "react";
import ExtensionLayout from "@/layouts/ExtensionLayout/ExtensionLayout";

import Landing from "./Landing/Landing";
import Login from "./Login/Login";
import CreateWallet from "./Create/CreateWallet";
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
   */

  // These states would be set after checking cookies / auth0 to set initial values
  const [loggedIn, setLogin] = useState(true);
  const [walletInit, setInit] = useState(false);

  // Pass this to child components to be able to reflect conditional render changes
  // This is the alternative to routing (render certain page components based on these states)
  const handleLogin = (state: boolean) => {
    setLogin(state);
  };

  // Called from Landing page to update wallet status
  const handleLanding = (state: boolean) => {
    setInit(state);
    setLogin(state);
  };

  // Return the page to render into the layout
  const renderState = (walletInit: boolean, loggedIn: boolean) => {
    if (walletInit) {
      if (loggedIn) {
        return <Wallet handleLogin={handleLogin} resetWallet={handleLanding} />;
      } else {
        <Login handleLogin={handleLogin} />;
      }
    } else {
      return <Landing handleLanding={handleLanding} />;
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
      <ExtensionLayout>{renderState(walletInit, loggedIn)}</ExtensionLayout>
    </>
  );
}
