import React from "react";
import Header from "@/components/Header/Header";
import BalanceBox from "@/components/BalanceBox/BalanceBox";
import Tabs from "@/components/Tabs/Tabs";

interface WalletProps {
  handleLogin: (state: boolean) => void;
  resetWallet: (state: boolean) => void;
}

const Wallet: React.FC<WalletProps> = (props: WalletProps) => {
  return (
    <>
      <Header showTools={true} />
      <BalanceBox />
      <Tabs />
    </>
  );
};

export default Wallet;
