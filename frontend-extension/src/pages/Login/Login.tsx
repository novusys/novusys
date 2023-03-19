import React from "react";
import styles from "./Login.module.scss";

interface LoginProps {
  handleLogin: (state: boolean) => void;
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  return <div className={styles["main__container"]}>Login Page</div>;
};

export default Login;
