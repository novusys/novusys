import React, { useEffect, useState, useContext } from "react";
import styles from "./CreateTransfer.module.scss";
import { ethers } from "ethers";
import { chains } from "../chains";
import { LandingCtx } from "../MainPopup/Popup";
import { UserCtx } from "../MainPopup/Popup";
import ChainSwitcher from "../../components/ChainSwitcher/ChainSwitcher";

interface CreateTransferProps {}

// todo: edit fields
type Details = {
  chainInfo: any;
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

const CreateTransfer: React.FC<CreateTransferProps> = (props: CreateTransferProps) => {
  const { landingAction, setLandingAction } = useContext(LandingCtx);
  const user = useContext(UserCtx);
  const [avatar, setAvatar] = useState("/images/defaultaccount.png");
  const [name, setName] = useState("Wallet 1");

  const [amount, setAmount] = useState("");
  const [targetAddr, setTarget] = useState("");
  const [paymaster, setPaymaster] = useState(false);

  useEffect(() => {
    setAvatar(user.avatar);
    setName(user.name);
  }, [user]);

  const compileTransfer = async (transfer: boolean) => {
    if (transfer) {
      // Build a txn request and set it in storage
      // Txn below is for Goerli
      const txn = {
        body: {
          cid: 5,
          target: targetAddr,
          value: ethers.utils.parseEther(amount)._hex,
          data: "0x",
          provider: "https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071",
          epAddr: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
          factoryAddr: "0x2bC52aEd814Ee695c9FD7B7EB4F8B9821E710ceF",
          withPm: paymaster,
        },
      };

      const details: Details = {
        chainInfo: chains[5],
        originName: "novusys wallet",
        originAddress: "0x45d0f...7ca5ECD",
        originAvatar: "/logos/novusys-leaf.png",
        target: txn.body.target,
        message: `Transfer ${amount} to ${abbrev(targetAddr)}`,
        txnValue: txn.body.value,
      };
      await chrome.storage.session.set({ CURRENT_TXN: { req: txn, details: details } });
      setLandingAction("transfer");
    } else {
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
              <div>{name}</div> <div>{"0x89py...09py"}</div>
            </div>
          </div>
          {/* Need to add checks on whether amount and address is valid */}
          <div className={styles["form__container"]}>
            <div className={styles["form__title"]}>
              <div className={styles["logo__container"]}>
                <img className={styles["header__logo"]} src="/logos/novusys-leaf.png" alt="" />
              </div>
              <div>Transfer</div>
            </div>
            <div className={styles["form__item"]}>
              <div className={styles["form__item__title"]}>Chain:</div>
              <ChainSwitcher />
            </div>
            <div className={styles["form__item"]}>
              <div className={styles["form__item__title"]}>Send To:</div>
              <input
                className={styles["form__textfield"]}
                type="text"
                value={targetAddr}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
            <div className={styles["form__item"]}>
              <div className={styles["form__item__title"]}>Amount:</div>
              <input className={styles["form__textfield"]} type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className={styles["form__item"]}>
              <div className={styles["form__item__title"]}>Use Paymaster?</div>
              <input className={styles["form__check"]} type="checkbox" checked={paymaster} onChange={() => setPaymaster(!paymaster)} />
            </div>
          </div>

          <div className={styles["transfer__actionbar"]}>
            <button onClick={() => compileTransfer(false)} className={styles["action__button"]}>
              Cancel
            </button>
            <button onClick={() => compileTransfer(true)} className={styles["action__button"] + " " + styles["transfer__button"]}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return renderState();
};

export default CreateTransfer;
