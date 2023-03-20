import React from "react";
import styles from "./Login.module.scss";

interface LoginProps {
  setLogin: (state: boolean) => void;
  setLanding: (action: string) => void;
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  // This page is for logging in after a wallet is imported
  return (
    <div className={styles["main__container"]}>
      <button onClick={() => props.setLogin(true)}>Login</button>
    </div>
  );
};

export default Login;
