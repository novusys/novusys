import React, { useState, useContext, useEffect } from "react";
import styles from "./Transfer.module.scss";
import { ethers } from "ethers";
import { chains } from "../chains";
import { LandingCtx } from "../MainPopup/Popup";
import { UserCtx } from "../MainPopup/Popup";

interface TransferProps {
  inputTxn?: any;
  inputDetails?: any;
}

// todo: edit fields
type Details = {
  chainInfo: any;
  walletName: string;
  walletAddress: string;
  walletAvatar: string;
  originName: string;
  originAddress: string;
  originAvatar?: string;
  target: string;
  message: string;
  txnValue: string;
};
function abbrev(str: string) {
  if (!str.length) return "";
  if (str.slice(0, 2) != "0x") return str;
  return str.slice(0, 6) + "..." + str.slice(str.length - 4, str.length);
}

const Transfer: React.FC<TransferProps> = (props: TransferProps) => {
  const { landingAction, setLandingAction } = useContext(LandingCtx);
  const user = useContext(UserCtx);
  const [avatar, setAvatar] = useState("/images/defaultaccount.png");
  const [name, setName] = useState("Wallet 1");
  const [details, setDetails] = useState({
    chainInfo: chains[5],
    originName: "novusys",
    originAddress: "0x45d0f...7ca5ECD",
    originAvatar: "/logos/novusys-leaf.png",
    target: "",
    message: ``,
    txnValue: "",
  });

  useEffect(() => {
    getTxnFromStorage()
      .then((res) => {
        if (res && res.status == 200) {
          setDetails(res.data.details);
        }
      })
      .catch((err) => {
        console.log("err while getting txn from storage", err);
      });
  }, []);

  useEffect(() => {
    setAvatar(user.avatar);
    setName(user.name);
  }, [user]);

  // The idea is to transition to a pending screen upon 'Confirm' click
  const handleTransfer = async (transfer: boolean) => {
    if (transfer) {
      // Proceed to the TxnPending page
      setLandingAction("pendingTransaction");
    } else {
      await chrome.storage.session.remove("CURRENT_TXN");
      await chrome.storage.session.remove("EXTERNAL_OVERRIDE");
      setLandingAction("wallet");
    }
  };
  // Grabs the request params from the background service worker
  async function getTxnFromStorage() {
    const txn = await chrome.storage.session.get("CURRENT_TXN");
    if (!txn || !txn.CURRENT_TXN) return { status: 404, message: "novusys wallet could not find pending transaction" };

    return { status: 200, message: "novusys wallet found txn to process", data: txn.CURRENT_TXN };
  }

  const renderState = () => {
    return (
      <div className={styles["main__container"]}>
        <div className={styles["outer__container"]}>
          <div className={styles["user__container"]}>
            <img className={styles["user__avatar"]} src={avatar} alt="" />
            <div className={styles["account__details"]}>
              <div>{name}</div> <div>{"0x89py...09py"}</div>
            </div>
            <div className={styles["chain__container"]}>{details.chainInfo.chain}</div>
          </div>
          <div className={styles["origin__container"]}>
            <img className={styles["origin__avatar"]} src={details.originAvatar} alt="" />
            <div className={styles["origin__name"]}>{details.originName}</div>
          </div>
          <div className={styles["message__warning"]}>Transfer</div>
          <div className={styles["message__container"]}>
            <div className={styles["message__title"]}>Message:</div>
            <div>{details.message}</div>
          </div>
        </div>
        <div className={styles["transfer__actionbar"]}>
          <button onClick={() => handleTransfer(false)} className={styles["action__button"]}>
            Cancel
          </button>
          <button onClick={() => handleTransfer(true)} className={styles["action__button"] + " " + styles["transfer__button"]}>
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return renderState();
};

export default Transfer;
