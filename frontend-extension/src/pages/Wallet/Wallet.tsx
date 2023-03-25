import React, { createContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import BalanceBox from "../../components/BalanceBox/BalanceBox";
import Tabs from "../../components/Tabs/Tabs";

interface WalletProps {
  handleLogout: () => void;
}
const Wallet: React.FC<WalletProps> = (props: WalletProps) => {
  return (
    <>
      <Header showTools={true} handleLogout={props.handleLogout} />
      <BalanceBox />
      <Tabs />
    </>
  );
};

export default Wallet;
