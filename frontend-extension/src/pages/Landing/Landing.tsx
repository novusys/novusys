import React from "react";
import styles from "./Landing.module.scss";

interface LandingProps {
  handleLanding: (state: boolean) => void;
}

const Landing: React.FC<LandingProps> = (props: LandingProps) => {
  return (
    <div className={styles["main__container"]}>
      <img src="logos/novusys-logo.png" className={styles["main__logo"]} alt="" />
      <button onClick={() => props.handleLanding(true)} className={styles["action__button"]}>
        Create Wallet
      </button>
      <button className={styles["action__button"]}>Import Wallet</button>
    </div>
  );
};

export default Landing;
