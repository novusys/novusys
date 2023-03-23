import { useState } from "react";

interface chainsInfo{
    chain: string
    id: number
    logo: string
    rpc: string
    test: boolean
}

interface chains {
    [key: number]: chainsInfo
}

export const useConfig = () => {
  
  const chains:chains = {
    1:{
        chain: "Ethereum",
        id: 1,
        logo: "./logos/chains/ethereum.png",
        rpc: "https://eth.llamarpc.com",
        test: false
    },
    137:{
        chain: "Polygon",
        id: 137,
        logo: "./logos/chains/polygon.png",
        rpc: "https://polygon.llamarpc.com",
        test: false
    },
    10:{
        chain: "Optimism",
        id: 10,
        logo: "./logos/chains/optimism.png",
        rpc: "https://mainnet.optimism.io",
        test: false
    },
    324:{
        chain: "zKSync Era",
        id: 324,
        logo: "./logos/chains/zksync.png",
        rpc: "https://zksync2-mainnet.zksync.io",
        test: false
    },
    5:{
        chain: "Ethereum Goerli",
        id: 5,
        logo: "./logos/chains/ethereum.png",
        rpc: "https://eth-goerli.public.blastapi.io",
        test: true
    },
    420:{
        chain: "Optimism Goerli",
        id: 420,
        logo: "./logos/chains/optimism.png",
        rpc: "https://chainid.link/?network=optimism-goerli",
        test: true
    },
    80001:{
        chain: "Polygon Mumbai",
        id: 80001,
        logo: "./logos/chains/polygon.png",
        rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
        test: true
    },
    280:{
        chain: "zKSync Era Testnet",
        id: 280,
        logo: "./logos/chains/zksync.png",
        rpc: "https://zksync2-testnet.zksync.dev",
        test: true
    },

  }
  
  return {
    chains
  }
}

// export default Theme