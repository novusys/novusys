import React, { useState, useContext, useEffect } from "react";
import styles from "./Transfer.module.scss";
import { ethers } from "ethers";
import TxnPending from "../TransactionPending/TransactionPending";
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
  const [transferSent, setSent] = useState(false);
  const { landingAction, setLandingAction } = useContext(LandingCtx);
  const user = useContext(UserCtx);
  const [avatar, setAvatar] = useState("/images/defaultaccount.png");
  const [name, setName] = useState("Wallet 1");

  useEffect(() => {
    console.log(user);
    setAvatar(user.avatar);
    setName(user.name);
  }, [user]);

  // TODO: Parse form to extract transfer details
  const example = {
    body: {
      target: "0xc0f70D98eC6aD9767d49341dB57674F1E2305B87",
      value: ethers.utils.parseEther("0.01")._hex,
      data: "0x",
      provider: "https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071",
      epAddr: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
      factoryAddr: "0x2bC52aEd814Ee695c9FD7B7EB4F8B9821E710ceF",
    },
  };
  const amount = "0.01 GoerliETH";
  // Build a Details
  const transfer: Details = {
    chainInfo: chains[5],
    walletName: "Account 1",
    walletAddress: "0x89py...09py",
    walletAvatar: "images/punk2924.png",
    originName: "novusys",
    originAddress: "0x45d0f...7ca5ECD",
    originAvatar: "/logos/novusys-leaf.png",
    target: example.body.target,
    message: `Transfer ${amount} to ${abbrev(example.body.target)}`,
    txnValue: example.body.value,
  };

  // The idea is to transition to a pending screen upon 'Sign' click
  const handleSig = (transfer: boolean) => {
    if (transfer) {
      // Proceed to the TxnPending page
      setSent(true);
    } else {
      setLandingAction("wallet");
    }
  };

  const renderState = () => {
    return transferSent ? (
      <TxnPending req={example} details={transfer} />
    ) : (
      <div className={styles["main__container"]}>
        <div className={styles["outer__container"]}>
          <div className={styles["user__container"]}>
            <img className={styles["user__avatar"]} src={avatar} alt="" />
            <div className={styles["account__details"]}>
              <div>{name}</div> <div>{transfer.walletAddress}</div>
            </div>
            <div className={styles["chain__container"]}>{transfer.chainInfo.chain}</div>
          </div>
          <div className={styles["origin__container"]}>
            <img className={styles["origin__avatar"]} src={transfer.originAvatar} alt="" />
            <div className={styles["origin__name"]}>{transfer.originName}</div>
            <div>{transfer.originAddress}</div>
          </div>
          <div className={styles["message__warning"]}>Transfer</div>
          <div className={styles["message__container"]}>
            <div className={styles["message__title"]}>Message:</div>
            <div>{transfer.message}</div>
          </div>
        </div>
        <div className={styles["transfer__actionbar"]}>
          <button onClick={() => handleSig(false)} className={styles["action__button"]}>
            Cancel
          </button>
          <button onClick={() => handleSig(true)} className={styles["action__button"] + " " + styles["transfer__button"]}>
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return renderState();
};

export default Transfer;
