import React, { useState } from "react";
import styles from "./ChainSwitcher.module.scss";

interface Chain {
  chainID: number;
  address: string;
  name: string;
  icon: string;
}

export default function ChainSwitcher() {
  // Likely set to null here at startup or load most recent chain for wallet
  const [chain, setChain] = useState<string | undefined>("Ethereum Mainnet");

  const chainItems: Chain[] = [
    { chainID: 1, name: "Ethereum Mainnet", address: "", icon: "" },
    { chainID: 137, name: "Polygon Mainnet", address: "", icon: "" },
    { chainID: 10, name: "Optimism", address: "", icon: "" },
  ];

  return <div>chain</div>;
}
