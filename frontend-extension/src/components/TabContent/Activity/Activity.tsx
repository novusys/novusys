import React from "react";
import styles from "./Activity.module.scss";
import tableStyles from "../Table.module.scss";

// Simple example. Can be updated later
type Transaction = {
  id: number;
  timestamp: string;
  // Interacted with
  address: string;
  // Labels the transaction (Approval All ..., Transferred ..., etc)
  action: string;
  // Add more options later (idea for an icon mapping)
  type: "pause" | "approve" | "transfer" | "sign";
  chain: string;
  amount: string;
  tx_hash: string;
};

export default function Activity() {
  const transactions: Transaction[] = [
    {
      id: 1,
      timestamp: "Mar 18",
      address: "0x48jf...RT98",
      action: "Signed Social Recovery",
      type: "sign",
      chain: "ETH",
      amount: "-0ETH",
      tx_hash: "",
    },
    {
      id: 2,
      timestamp: "Mar 18",
      address: "0x54ut...LR94",
      action: "Transfer Token",
      type: "transfer",
      chain: "ETH",
      amount: "-1ETH",
      tx_hash: "",
    },
    {
      id: 3,
      timestamp: "Mar 18",
      address: "0xar4t...he64",
      action: "Set Approval for Token",
      type: "approve",
      chain: "ETH",
      amount: "-0ETH",
      tx_hash: "",
    },
    {
      id: 4,
      timestamp: "Mar 17",
      address: "0x54ut...LR94",
      action: "Set Pause for Wallet",
      type: "pause",
      chain: "ETH",
      amount: "-0ETH",
      tx_hash: "",
    },
    {
      id: 1,
      timestamp: "Mar 17",
      address: "0x48jf...RT98",
      action: "Signed Social Recovery",
      type: "sign",
      chain: "ETH",
      amount: "-0ETH",
      tx_hash: "",
    },
    {
      id: 2,
      timestamp: "Mar 16",
      address: "0x54ut...LR94",
      action: "Transfer Token",
      type: "transfer",
      chain: "ETH",
      amount: "-1ETH",
      tx_hash: "",
    },
    {
      id: 3,
      timestamp: "Mar 16",
      address: "0xar4t...he64",
      action: "Set Approval for Token",
      type: "approve",
      chain: "ETH",
      amount: "-0ETH",
      tx_hash: "",
    },
    {
      id: 4,
      timestamp: "Mar 16",
      address: "0x54ut...LR94",
      action: "Set Pause for Wallet",
      type: "pause",
      chain: "ETH",
      amount: "-0ETH",
      tx_hash: "",
    },
  ];

  const renderCell = (item: Transaction) => {
    // Handle any invalid parameters or defaults
    // For transactions likely need to cut off action name if too long
    // Map an action icon to each item based on action type
    // Parse timestamp format to a readable format

    return (
      <>
        {/* <td>
          <img src={item.} className={styles["account__avatar"]} alt="" />
        </td> */}
        <td className={styles["action__container"]}>
          {item.action}{" "}
          <div className={styles["details__container"]}>
            {item.timestamp} · {item.address}
          </div>
        </td>
        <td className={styles["amount__container"]}>{item.amount}</td>
      </>
    );
  };

  return (
    <table className={tableStyles["table__container"]}>
      <tbody className={tableStyles["table__body"]}>
        {transactions.map((item) => (
          <tr className={tableStyles["table__item"]}>{renderCell(item)}</tr>
        ))}
      </tbody>
    </table>
  );
}
