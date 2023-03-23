import React from "react";
import Header from "../../components/Header/Header";
import BalanceBox from "../../components/BalanceBox/BalanceBox";
import Tabs from "../../components/Tabs/Tabs";

interface WalletProps {
  handleLogout: () => void;
  resetWallet: () => void;
  setLanding: (action: string) => void;
}

const Wallet: React.FC<WalletProps> = (props: WalletProps) => {
  return (
    <>
      <Header showTools={true} handleLogout={props.handleLogout} resetWallet={props.resetWallet} setLanding={props.setLanding} />
      <BalanceBox />
      <Tabs />
    </>
  );
};

export default Wallet;
