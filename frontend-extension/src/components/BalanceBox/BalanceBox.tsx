import React from "react";
import styles from "./BalanceBox.module.scss";

export default function BalanceBox() {
  return (
    <div className={styles["main__container"]}>
      <div className={styles["profile__container"]}>
        <img className={styles["profile__image"]} src="images/punk2924.png" alt="" />
        <h1>satoshi.eth</h1>
      </div>

      {/* crypto balance */}
      <div className={styles["crypto__balance"]}>1.4665 ETH</div>

      {/* USD conversion of balance */}
      <div className={styles["usd__balance"]}>$2,527.75 USD</div>

      {/* Action row buttons (pause wallet, respond to sigs, etc) */}
      <div className={styles["action__container"]}>
        <button className={styles["action__button"]}>Pause</button>
        <button className={styles["action__button"]}>Transfer</button>
        <button className={styles["action__button"]}>Sign</button>
      </div>
    </div>
  );
}
