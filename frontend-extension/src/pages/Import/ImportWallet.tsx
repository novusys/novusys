import React from "react";
import styles from "./ImportWallet.module.scss";
import Header from "@/components/Header/Header";

interface ImportWalletProps {
  setLogin: (state: boolean) => void;
  activeWallet: (state: boolean) => void;
  setLanding: (action: string) => void;
}

const ImportWallet: React.FC<ImportWalletProps> = (props: ImportWalletProps) => {
  // This page will utilize auth0 to authenticate user and load wallet details
  // Eventually props.setLogin(true) will be called upon successful authentication to trigger wallet load
  return (
    <>
      <Header showTools={false} setLogin={props.setLogin} activeWallet={props.activeWallet} setLanding={props.setLanding} />
      <div className={styles["main__container"]}>
        <button onClick={() => props.activeWallet(true)}>Login</button>
      </div>
    </>
  );
};

export default ImportWallet;
