import { useState } from "react";

interface chainsInfo {
  chain: string;
  id: number;
  logo: string;
  rpc: string;
  bundler: string;
  factory: string;
  entryPoint: string;
  test: boolean;
  pm: boolean,
  launchPrice: string
  explorer: string
  paymasterAddress: string
}

interface chains {
  [key: number]: chainsInfo;
}

export const useConfig = () => {
  const chains: chains = {
    1: {
      chain: "Ethereum",
      id: 1,
      logo: "./logos/chains/ethereum.png",
      rpc: "https://eth.llamarpc.com",
      explorer: "https://etherscan.io/",
      entryPoint: "",
      bundler: "",
      factory: "",
      test: false,
      pm: false,
      launchPrice: ".1",
      paymasterAddress: "",
    },
    137: {
      chain: "Polygon",
      id: 137,
      logo: "./logos/chains/polygon.png",
      rpc: "https://polygon.llamarpc.com",
      explorer: "https://polygonscan.com/",
      bundler: "",
      entryPoint: "",
      factory: "",
      test: false,
      pm: false,
      launchPrice: ".1",
      paymasterAddress: "",
    },
    10: {
      chain: "Optimism",
      id: 10,
      logo: "./logos/chains/optimism.png",
      rpc: "https://mainnet.optimism.io",
      explorer: "https://optimistic.etherscan.io/tx/",
      bundler: "",
      entryPoint: "",
      factory: "",
      test: false,
      pm: false,
      launchPrice: ".1",
      paymasterAddress: "",
    },
    324: {
      chain: "zKSync Era",
      id: 324,
      logo: "./logos/chains/zksync.png",
      rpc: "https://zksync2-mainnet.zksync.io",
      explorer: "https://zkscan.io/explorer/",
      bundler: "",
      entryPoint: "",
      factory: "",
      test: false,
      pm: false,
      launchPrice: ".1",
      paymasterAddress: "",
    },
    5: {
      chain: "Ethereum Goerli",
      id: 5,
      logo: "./logos/chains/ethereum.png",
      rpc: "https://eth-goerli.public.blastapi.io",
      explorer: "https://goerli.etherscan.io/",
      entryPoint: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
      factory: "0x2bC52aEd814Ee695c9FD7B7EB4F8B9821E710ceF",
      bundler: "https://node.stackup.sh/v1/rpc/9bf24b7d46a1e044c3244088dfe8dee6c87bb2399278bbb3c3f9935c00451f4e",
      test: true,
      pm: true,
      launchPrice: ".15",
      paymasterAddress: "0xxx",
    },
    420: {
      chain: "Optimism Goerli",
      id: 420,
      logo: "./logos/chains/optimism.png",
      rpc: "https://chainid.link/?network=optimism-goerli",
      explorer: "https://goerli-optimism.etherscan.io/",
      bundler: "",
      entryPoint: "",
      factory: "",
      test: true,
      pm: false,
      launchPrice: ".1",
      paymasterAddress: "",
    },
    80001: {
      chain: "Polygon Mumbai",
      id: 80001,
      logo: "./logos/chains/polygon.png",
      rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
      explorer: "https://mumbai.polygonscan.com/",
      bundler: "https://node.stackup.sh/v1/rpc/adf24d6207f34762b88813ca0b0026b534dcb6ffc912e51305eaa98a30180a86",
      entryPoint: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
      factory: "0xFfC51BCb09c62B926Ff6c42e478995Df8BC42f08",
      test: true,
      pm: false,
      launchPrice: ".1",
      paymasterAddress: "0x",
    },
    280: {
      chain: "zKSync Era Testnet",
      id: 280,
      logo: "./logos/chains/zksync.png",
      rpc: "https://zksync2-testnet.zksync.dev",
      explorer: "https://zksync2-testnet.zkscan.io/",
      bundler: "",
      entryPoint: "",
      factory: "",
      test: true,
      pm: false,
      launchPrice: ".1",
      paymasterAddress: "",
    },
  };

  return {
    chains,
  };
};

// export default Theme
