import React from "react";
import Header from "../../components/Header/Header";
import BalanceBox from "../../components/BalanceBox/BalanceBox";
import Tabs from "../../components/Tabs/Tabs";

interface WalletProps {
  setLogin: (state: boolean) => void;
  resetWallet: () => void;
  setLanding: (action: string) => void;
}

const Wallet: React.FC<WalletProps> = (props: WalletProps) => {
  return (
    <>
      <Header showTools={true} setLogin={props.setLogin} resetWallet={props.resetWallet} setLanding={props.setLanding} />
      <BalanceBox />
      <Tabs />
    </>
  );
};

export default Wallet;
