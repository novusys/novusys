import React, { useContext } from "react";
import styles from "./Landing.module.scss";
import { LandingCtx } from "../MainPopup/Popup";

interface LandingProps {
  handleLogin: () => void;
}

const Landing: React.FC<LandingProps> = (props: LandingProps) => {
  const { landingAction, setLandingAction } = useContext(LandingCtx);

  return (
    <div className={styles["main__container"]}>
      <img src="logos/novusys-logo.png" className={styles["main__logo"]} alt="" />
      <button onClick={() => setLandingAction("signup")} className={styles["action__button"]}>
        Sign Up
      </button>
      <button onClick={() => props.handleLogin()} className={styles["action__button"]}>
        Login
      </button>
    </div>
  );
};

export default Landing;
