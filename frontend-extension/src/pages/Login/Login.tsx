import React from "react";
import styles from "./Login.module.scss";

interface LoginProps {
  setLogin: (state: boolean) => void;
  setLanding: (action: string) => void;
  resetWallet: () => void;
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  // This page is for logging in after a wallet is imported
  return (
    <div className={styles["main__container"]}>
      <img src="logos/novusys-logo.png" className={styles["main__logo"]} alt="" />
      <button onClick={() => props.setLogin(true)} className={styles["action__button"]}>
        Login
      </button>
      <button onClick={() => props.resetWallet()} className={styles["action__button"] + " " + styles["reset__button"]}>
        Reset Wallet
      </button>
    </div>
  );
};

export default Login;
