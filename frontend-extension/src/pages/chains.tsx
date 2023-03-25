interface chainsInfo {
  chain: string;
  id: number;
  logo: string;
  rpc: string;
  bundler: string;
  factory: string;
  entryPoint: string;
  test: boolean;
  pm: boolean;
  launchPrice: string;
  explorer: string;
}

interface chains {
  [key: number]: chainsInfo;
}

export const chains: chains = {
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
  },
  5: {
    chain: "Ethereum Goerli",
    id: 5,
    logo: "./logos/chains/ethereum.png",
    rpc: "https://eth-goerli.public.blastapi.io",
    explorer: "https://goerli.etherscan.io/",
    entryPoint: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
    factory: "0x2bC52aEd814Ee695c9FD7B7EB4F8B9821E710ceF",
    bundler: "https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071",
    test: true,
    pm: false,
    launchPrice: ".1",
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
  },
  80001: {
    chain: "Polygon Mumbai",
    id: 80001,
    logo: "./logos/chains/polygon.png",
    rpc: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
    explorer: "https://mumbai.polygonscan.com/",
    bundler: "",
    entryPoint: "",
    factory: "",
    test: true,
    pm: false,
    launchPrice: ".1",
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
  },
};
