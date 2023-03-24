import React from "react";
import styles from "./Signature.module.scss";

interface SignatureProps {}

// todo: edit fields
type Signature = {
  chainID: number;
  chainName: string;
  walletName: string;
  walletAddress: string;
  walletAvatar: string;
  originURL: string;
  originName: string;
  originAddress: string;
  originAvatar?: string;
  message: string;
};

const Signature: React.FC<SignatureProps> = (props: SignatureProps) => {
  const sig: Signature = {
    chainID: 1,
    chainName: "Ethereum Mainnet",
    walletName: "Account 1",
    walletAddress: "0x89py...09py",
    walletAvatar: "images/punk2924.png",
    originURL: "https://opensea.io",
    originName: "OpenSea",
    originAddress: "0x1E0049...003c71",
    originAvatar: "https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png",
    message: "Sign to bulk list NFTs",
  };
  // This page is for logging in after a wallet is imported
  return (
    <div className={styles["main__container"]}>
      <div className={styles["sig__header"]}>
        <img className={styles["header__logo"]} src="logos/novusys-leaf.png" alt="" /> <div>Signature Request</div>
      </div>
      <div className={styles["details__container"]}>
        <div className={styles["user__container"]}>
          <img className={styles["user__avatar"]} src={sig.walletAvatar} alt="" />
          <div className={styles["account__details"]}>
            <div>{sig.walletName}</div> <div>{sig.walletAddress}</div>
          </div>
          <div className={styles["chain__container"]}>{sig.chainName}</div>
        </div>
        <div className={styles["origin__container"]}>
          <img className={styles["origin__avatar"]} src={sig.originAvatar} alt="" />
          <div className={styles["origin__name"]}>{sig.originName}</div>
          <div>{sig.originURL}</div>
          <div>{sig.originAddress}</div>
        </div>
        <div className={styles["message__warning"]}>You are signing</div>
        <div className={styles["message__container"]}>
          <div className={styles["message__title"]}>Message:</div>
          <div>{sig.message}</div>
        </div>
      </div>
      <div className={styles["sig__actionbar"]}>
        <button className={styles["action__button"]}>Reject</button>
        <button className={styles["action__button"] + " " + styles["sign__button"]}>Sign</button>
      </div>
    </div>
  );
};

export default Signature;
