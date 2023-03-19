import React from "react";
import styles from "./Header.module.scss";
import { FiLogOut } from "react-icons/fi";
import ChainSwitcher from "../ChainSwitcher/ChainSwitcher";

interface HeaderProps {
  showTools: boolean;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return (
    <div className={styles["main__container"]}>
      {props.showTools ? (
        <>
          <img src="logos/novusys-leaf.png" className={styles["logo"]} alt="" />
          <div className={styles["switcher__container"]}>
            <ChainSwitcher />
          </div>

          <button className={styles["logout__button"]}>
            <FiLogOut className={styles["logout_icon"]} />
          </button>
        </>
      ) : (
        <img src="logos/novusys-logo.png" className={styles["landing__logo"]} alt="" />
      )}
    </div>
  );
};

export default Header;
