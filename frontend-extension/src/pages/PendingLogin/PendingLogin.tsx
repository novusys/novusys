import React from "react";
import styles from "./PendingLogin.module.scss";
import Header from "../../components/Header/Header";

interface PendingLoginProps {
  auth0PopUp: boolean;
}

const PendingLogin: React.FC<PendingLoginProps> = (props: PendingLoginProps) => {
  return (
    <>
      <div className={styles["main__container"]}>
        {props.auth0PopUp ? <div>Complete login through Auth0 Portal</div> : <div>Logging in...</div>}
      </div>
    </>
  );
};

export default PendingLogin;
