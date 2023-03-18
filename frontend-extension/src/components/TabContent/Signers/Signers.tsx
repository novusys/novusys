import React from "react";
import styles from "./Signers.module.scss";
import { Table, User, css } from "@nextui-org/react";

type Signer = {
  id: number;
  address: string;
  avatar?: string;
  role: string;
};

export default function Signers() {
  const columns = [
    { name: "Address", uid: "address" },
    { name: "Role", uid: "role" },
  ];

  // Fetch signers and populate array
  const accounts: Signer[] = [
    {
      id: 1,
      avatar: "https://blogs.airdropalert.com/wp-content/uploads/2021/12/Sappy-Seal-PFP-NFTs-1003x1024.png",
      address: "0x94c7...76F3",
      role: "Guardian",
    },
    {
      id: 2,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwIG0oQUtISCXjhR_TxH-qfxrAGHlKBPD53A&usqp=CAU",
      address: "0x89py...09py",
      role: "Signer",
    },
    { id: 3, avatar: "", address: "0x45yi...8C32", role: "Signer" },
    { id: 4, avatar: "", address: "0xfr54...76F3", role: "Guardian" },
    { id: 5, avatar: "", address: "0x46t9...43L1", role: "Guardian" },
    { id: 6, avatar: "", address: "0x94c7...76F3", role: "Guardian" },
    { id: 7, avatar: "", address: "0x94c7...76F3", role: "Guardian" },
    { id: 8, avatar: "", address: "0x94c7...76F3", role: "Guardian" },
  ];

  const renderCell = (account: Signer, key: React.Key) => {
    const value = account[key as keyof typeof account];
    switch (key) {
      case "address":
        return <User squared src={account?.avatar} name={value}></User>;
      case "role":
        return (
          <div className={styles["role"] + " " + (value == "Guardian" ? styles["role__guardian"] : styles["role__signer"])}>
            {value}
          </div>
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
      <Table.Body items={accounts}>
        {(item: Signer) => <Table.Row>{(columnKey) => <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>}</Table.Row>}
      </Table.Body>
    </Table>
  );
}
