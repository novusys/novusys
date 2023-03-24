import React from "react";
import styles from "./TransactionPending.module.scss";

interface TxnPendingProps {}

// todo: edit fields
type TxnPending = {};

const TxnPending: React.FC<TxnPendingProps> = (props: TxnPendingProps) => {
  // This page is for logging in after a wallet is imported
  return <div className={styles["main__container"]}></div>;
};

export default TxnPending;
