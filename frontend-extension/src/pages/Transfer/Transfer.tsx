import React, { useState, useContext, useEffect } from "react";
import styles from "./Transfer.module.scss";
import { ethers } from "ethers";
import { chains } from "../chains";
import { LandingCtx } from "../MainPopup/Popup";
import { UserCtx } from "../MainPopup/Popup";

interface TransferProps {}

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

  useEffect(() => {
    setAvatar(user.avatar);
    setName(user.name);
  }, [user]);

  // TODO: Parse form to extract transfer details
  const txn = {
    body: {
      cid: 5,
      target: "0xc0f70D98eC6aD9767d49341dB57674F1E2305B87",
      value: ethers.utils.parseEther("0.01")._hex,
      data: "0x",
      provider: "https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071",
      epAddr: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
      factoryAddr: "0x2bC52aEd814Ee695c9FD7B7EB4F8B9821E710ceF",
      withPm: true,
    },
  };
  const amount = "0.01 GoerliETH";
  // Build a Details
  const details: Details = {
    chainInfo: chains[5],
    walletName: "Account 1",
    walletAddress: "0x89py...09py",
    walletAvatar: "images/punk2924.png",
    originName: "novusys",
    originAddress: "0x45d0f...7ca5ECD",
    originAvatar: "/logos/novusys-leaf.png",
    target: txn.body.target,
    message: `Transfer ${amount} to ${abbrev(txn.body.target)}`,
    txnValue: txn.body.value,
  };

  // The idea is to transition to a pending screen upon 'Confirm' click
  const handleTransfer = async (transfer: boolean) => {
    if (transfer) {
      // Proceed to the TxnPending page
      await chrome.storage.session.set({ CURRENT_TXN: { req: txn, details: details } });
      setLandingAction("pendingTransaction");
    } else {
      await chrome.storage.session.remove("CURRENT_TXN");
      await chrome.storage.session.remove("EXTERNAL_OVERRIDE");
      setLandingAction("wallet");
    }
  };

  const renderState = () => {
    return (
      <div className={styles["main__container"]}>
        <div className={styles["outer__container"]}>
          <div className={styles["user__container"]}>
            <img className={styles["user__avatar"]} src={avatar} alt="" />
            <div className={styles["account__details"]}>
              <div>{name}</div> <div>{details.walletAddress}</div>
            </div>
            <div className={styles["chain__container"]}>{details.chainInfo.chain}</div>
          </div>
          <div className={styles["origin__container"]}>
            <img className={styles["origin__avatar"]} src={details.originAvatar} alt="" />
            <div className={styles["origin__name"]}>{details.originName}</div>
            <div>{details.originAddress}</div>
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
