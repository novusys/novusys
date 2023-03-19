import React from "react";
import styles from "./Signers.module.scss";
import tableStyles from "../Table.module.scss";

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
    {
      id: 3,
      avatar: "https://blogs.airdropalert.com/wp-content/uploads/2021/09/cool-cats-pfp-nft.png",
      address: "0x45yi...8C32",
      role: "Signer",
    },
    {
      id: 4,
      avatar: "https://www.mintface.xyz/content/images/2021/08/QmdhoQdQ1oB2rdJD3ZpexSwwfspqAWGMdDjPR3mYeWGpZT.png",
      address: "0xfr54...76F3",
      role: "Guardian",
    },
    { id: 5, avatar: "", address: "0x46t9...43L1", role: "Guardian" },
    { id: 6, avatar: "", address: "0x94c7...76F3", role: "Guardian" },
    { id: 7, avatar: "", address: "0x94c7...76F3", role: "Guardian" },
    { id: 8, avatar: "", address: "0x94c7...76F3", role: "Guardian" },
  ];

  const renderCell = (item: Signer) => {
    // Handle any invalid parameters or defaults
    if (!item.avatar) {
      item.avatar = "/images/defaultaccount.png";
    }

    return (
      <>
        <td>
          <img src={item.avatar} className={styles["account__avatar"]} alt="" />
        </td>
        <td>{item.address}</td>
        <td className={styles["role"] + " " + (item.role == "Guardian" ? styles["role__guardian"] : styles["role__signer"])}>
          {item.role}
        </td>
      </>
    );
  };

  return (
    <table className={tableStyles["table__container"]}>
      <tbody className={tableStyles["table__body"]}>
        {accounts.map((item) => (
          <tr className={tableStyles["table__item"]}>{renderCell(item)}</tr>
        ))}
      </tbody>
    </table>
  );
}
