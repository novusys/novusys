import React from "react";
import styles from "./CreateWallet.module.scss";
import Header from "@/components/Header/Header";

interface CreateWalletProps {}

const CreateWallet: React.FC<CreateWalletProps> = (props: CreateWalletProps) => {
  return (
    <>
      <Header showTools={false} />
      <div className={styles["main__container"]}>
        <img src="logos/novusys-logo.png" className={styles["main__logo"]} alt="" />
        Create Wallet
      </div>
    </>
  );
};

export default CreateWallet;
