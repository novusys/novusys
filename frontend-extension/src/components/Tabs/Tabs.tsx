import React, { useState } from "react";
import styles from "./Tabs.module.scss";
import Signers from "../TabContent/Signers/Signers";
import Activity from "../TabContent/Activity/Activity";

export default function Tabs() {
  const [active, setActive] = useState("signersTab");

  const handleSigners = () => {
    // Actions for when Signer Tab is clicked
    setActive("signersTab");
  };

  const handleActivity = () => {
    // Actions for when Activity Tab is clicked
    setActive("activityTab");
  };

  return (
    <div className={styles["main__container"]}>
      {/* Tab Navigation */}
      <ul className={styles["tab__container"]}>
        {/* Was having issues with li.active so this is jank workaround */}
        <li className={active == "signersTab" ? styles["li__active"] : ""} onClick={handleSigners}>
          Signers
        </li>
        <li className={active == "activityTab" ? styles["li__active"] : ""} onClick={handleActivity}>
          Activity
        </li>
      </ul>
      <div className={styles["content__container"]}>
        {/* Tab Content */}
        {active == "signersTab" ? <Signers /> : <Activity />}
      </div>
    </div>
  );
}
