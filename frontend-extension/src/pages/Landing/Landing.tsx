import React from "react";
import styles from "./Landing.module.scss";

interface LandingProps {
  setLanding: (action: string) => void;
}

const Landing: React.FC<LandingProps> = (props: LandingProps) => {
  // This page would conditionally render the create / import pages depending on action
  // See Create/CreateWallet.tsx and Import/Import

  return (
    <div className={styles["main__container"]}>
      <img src="logos/novusys-logo.png" className={styles["main__logo"]} alt="" />
      <button onClick={() => props.setLanding("create")} className={styles["action__button"]}>
        Sign Up
      </button>
      <button onClick={() => props.setLanding("import")} className={styles["action__button"]}>
        Login
      </button>
    </div>
  );
};

export default Landing;
