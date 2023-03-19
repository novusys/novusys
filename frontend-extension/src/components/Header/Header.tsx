import React from "react";
import styles from "./Header.module.scss";
import { FiLogOut } from "react-icons/fi";
import ChainSwitcher from "../ChainSwitcher/ChainSwitcher";

export default function Header() {
  return (
    <div className={styles["main__container"]}>
      {/* redirects to dashboard */}
      <img src="logos/novusys-leaf.png" className={styles["logo"]} alt="" />

      {/* dropdown menu to change chains */}
      <div className={styles["switcher__container"]}>
        <ChainSwitcher />
      </div>

      {/* locks wallet with local password set upon wallet creation */}
      <button className={styles["logout__button"]}>
        <FiLogOut className={styles["logout_icon"]} />
      </button>
    </div>
  );
}
