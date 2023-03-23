import React from "react";
import styles from "./Header.module.scss";
import { FiLogOut, FiInfo, FiArrowLeft } from "react-icons/fi";
import ChainSwitcher from "../ChainSwitcher/ChainSwitcher";

interface HeaderProps {
  showTools: boolean;
  handleLogout?: () => void;
  resetWallet?: () => void;
  setLanding: (action: string) => void;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const handleLogoutClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (e) => {
    props.handleLogout?.();
  };
  const handleResetClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (e) => {
    props.resetWallet?.();
  };
  return (
    <div className={styles["main__container"]}>
      {props.showTools ? (
        <>
          <img src="logos/novusys-leaf.png" className={styles["logo"]} alt="" />
          <div className={styles["switcher__container"]}>
            <ChainSwitcher />
          </div>

          <button onClick={handleLogoutClick} className={styles["right__button"]}>
            <FiLogOut className={styles["logout__icon"]} />
          </button>
        </>
      ) : (
        <>
          <button onClick={() => props.setLanding("abort")} className={styles["left__button"]}>
            <FiArrowLeft />
          </button>
          <img src="logos/novusys-logo.png" className={styles["landing__logo"]} alt="" />

          <button className={styles["right__button"]}>
            <FiInfo />
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
