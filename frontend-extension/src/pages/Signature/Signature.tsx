import React, { useState } from "react";
import styles from "./Signature.module.scss";
import { ethers } from "ethers";
import TxnPending from "../TransactionPending/TransactionPending";
import { chains } from "../chains";

interface SignatureProps {}

// todo: edit fields
type Details = {
  chainInfo: any;
  walletName: string;
  walletAddress: string;
  walletAvatar: string;
  originName: string;
  originAddress: string;
  originAvatar?: string;
  message: string;
  txnValue: string;
};

const Signature: React.FC<SignatureProps> = (props: SignatureProps) => {
  const [sigSent, setSent] = useState(false);

  // Build a Details
  const sig: Details = {
    chainInfo: chains[1],
    walletName: "Account 1",
    walletAddress: "0x89py...09py",
    walletAvatar: "images/punk2924.png",
    originName: "OpenSea",
    originAddress: "0x1E0049...003c71",
    originAvatar: "https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png",
    message: "Sign to bulk list NFTs",
    txnValue: "0.01e",
  };
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

  // The idea is to transition to a pending screen upon 'Sign' click
  const handleSig = (signed: boolean) => {
    if (signed) {
      // Proceed to the TxnPending page
      setSent(true);
    } else {
      // Close the signature window / return to wallet
    }
  };

  const renderState = () => {
    return sigSent ? (
      <TxnPending req={example} details={sig} />
    ) : (
      <div className={styles["main__container"]}>
        <div className={styles["outer__container"]}>
          <div className={styles["user__container"]}>
            <img className={styles["user__avatar"]} src={sig.walletAvatar} alt="" />
            <div className={styles["account__details"]}>
              <div>{sig.walletName}</div> <div>{sig.walletAddress}</div>
            </div>
            <div className={styles["chain__container"]}>{sig.chainInfo.chain}</div>
          </div>
          <div className={styles["origin__container"]}>
            <img className={styles["origin__avatar"]} src={sig.originAvatar} alt="" />
            <div className={styles["origin__name"]}>{sig.originName}</div>
            <div>{sig.originAddress}</div>
          </div>
          <div className={styles["message__warning"]}>Signature Request</div>
          <div className={styles["message__container"]}>
            <div className={styles["message__title"]}>Message:</div>
            <div>{sig.message}</div>
          </div>
        </div>
        <div className={styles["sig__actionbar"]}>
          <button onClick={() => handleSig(false)} className={styles["action__button"]}>
            Reject
          </button>
          <button onClick={() => handleSig(true)} className={styles["action__button"] + " " + styles["sign__button"]}>
            Sign
          </button>
        </div>
      </div>
    );
  };

  return renderState();
};

export default Signature;
