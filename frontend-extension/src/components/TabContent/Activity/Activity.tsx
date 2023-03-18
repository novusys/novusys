import React from "react";
import styles from "./Activity.module.scss";
import { Table, User, css } from "@nextui-org/react";

// Simple example. Can be updated later
type Transaction = {
  id: number;
  timestamp: string;
  // Interacted with
  address: string;
  // Labels the transaction (Approval All ..., Transferred ..., etc)
  action: string;
  // Add more options later (idea for an icon mapping)
  type: "pause" | "approve" | "transfer" | "exchange";
  chain: string;
  amount: string;
};
type Signer = {
  id: number;
  address: string;
  avatar?: string;
  role: string;
};

export default function Activity() {
  const columns = [
    { name: "Transaction", uid: "action" },
    { name: "Details", uid: "amount" },
  ];

  // Fetch signers and populate array
  const accounts: Signer[] = [
    {
      id: 1,
      avatar: "",
      address: "",
      role: "Guardian",
    },
    { id: 2, avatar: "", address: "", role: "Signer" },
    { id: 3, avatar: "", address: "", role: "Signer" },
    { id: 4, avatar: "", address: "", role: "Guardian" },
    { id: 5, avatar: "", address: "", role: "Guardian" },
    { id: 6, avatar: "", address: "", role: "Guardian" },
    { id: 7, avatar: "", address: "", role: "Guardian" },
    { id: 8, avatar: "", address: "", role: "Guardian" },
  ];

  const transactions: Transaction[] = [
    {
      id: 1,
      timestamp: "",
      address: "0x54ut...LR94",
      action: "Set Approval for Token",
      type: "approve",
      chain: "ETH",
      amount: "-1ETH",
    },
    {
      id: 1,
      timestamp: "",
      address: "0x54ut...LR94",
      action: "Set Approval for Token",
      type: "approve",
      chain: "ETH",
      amount: "-1ETH",
    },
    {
      id: 1,
      timestamp: "",
      address: "0x54ut...LR94",
      action: "Set Approval for Token",
      type: "approve",
      chain: "ETH",
      amount: "-1ETH",
    },
    {
      id: 1,
      timestamp: "",
      address: "0x54ut...LR94",
      action: "Set Approval for Token",
      type: "approve",
      chain: "ETH",
      amount: "-1ETH",
    },
    {
      id: 1,
      timestamp: "",
      address: "0x54ut...LR94",
      action: "Set Approval for Token",
      type: "approve",
      chain: "ETH",
      amount: "-1ETH",
    },
    {
      id: 1,
      timestamp: "",
      address: "0x54ut...LR94",
      action: "Set Approval for Token",
      type: "approve",
      chain: "ETH",
      amount: "-1ETH",
    },
  ];

  const renderCell = (txn: Transaction, key: React.Key) => {
    const value = txn[key as keyof typeof txn];
    switch (key) {
      case "action":
        return (
          <User squared src={txn?.timestamp} name={value}>
            {txn.address}
          </User>
        );
      default:
        return value;
    }
  };

  return (
    <Table
      css={{
        height: "100%",
        width: "100%",
        padding: "0.8rem 0.8rem 0 0.8rem",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>{(column) => <Table.Column key={column.uid}>{column.name}</Table.Column>}</Table.Header>
      <Table.Body items={transactions}>
        {(item: Transaction) => <Table.Row>{(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}</Table.Row>}
      </Table.Body>
    </Table>
  );
}
