import React, { useState, useContext, useEffect } from "react";
import styles from "./BalanceBox.module.scss";
import { LandingCtx } from "../../pages/MainPopup/Popup";
import { UserCtx } from "../../pages/MainPopup/Popup";

interface BoxProps {}

const BalanceBox: React.FC<BoxProps> = (props: BoxProps) => {
  const { landingAction, setLandingAction } = useContext(LandingCtx);
  const user = useContext(UserCtx);
  const [avatar, setAvatar] = useState("/images/defaultaccount.png");
  const [name, setName] = useState("Wallet 1");

  useEffect(() => {
    setAvatar(user.avatar);
    setName(user.name);
  }, [user]);

  async function hasTxn() {
    const txn = await chrome.storage.session.get("CURRENT_TXN");
    if (!txn || !txn.CURRENT_TXN) return false;

    return true;
  }

  useEffect(() => {
    hasTxn()
      .then((res) => {
        if (res) {
          console.log("RUNNING");
          chrome.runtime.sendMessage({ walletShown: true });
          chrome.runtime.onMessage.addListener(async function (message) {
            if (message.externalTransfer) {
              setLandingAction("transfer");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles["main__container"]}>
      <div className={styles["profile__container"]}>
        <img className={styles["profile__image"]} src={avatar} alt="" />
        <h1>{name}</h1>
      </div>

      <div className={styles["balance__container"]}>
        <div className={styles["crypto__balance"]}>1.4665 ETH</div>
        <div className={styles["usd__balance"]}>$2,527.75 USD</div>
      </div>

      <div className={styles["action__container"]}>
        <button className={styles["action__button"]}>Pause</button>
        <button onClick={() => setLandingAction("createTransfer")} className={styles["action__button"]}>
          Transfer
        </button>
        <button className={styles["action__button"]}>Sign</button>
      </div>
    </div>
  );
};
export default BalanceBox;
