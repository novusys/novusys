import React from "react";
import styles from "./Header.module.scss";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  return (
    <div className={styles["main__container"]}>
      <img src="logos/novusys-leaf.png" className={styles["logo"]} alt="" />
      <div className={styles["switcher__container"]}>chain</div>
      <FiLogOut className={styles["logout__icon"]} />
    </div>
  );
}
