import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
require("dotenv").config();

const ALCHEMY_RINKEBY_RPC_URL = process.env.ALCHEMY_RINKEBY_RPC_URL;
const ALCHEMY_MAINNET_RPC_URL = process.env.ALCHEMY_MAINNET_RPC_URL;
const KMS_STAGING_KEY_ID = process.env.KMS_STAGING_KEY_ID;
const KMS_PRODUCTION_KEY_ID = process.env.KMS_PRODUCTION_KEY_ID;
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mainnet: {
      url: `${ALCHEMY_MAINNET_RPC_URL}`,
      kmsKeyId: KMS_PRODUCTION_KEY_ID
    },
    rinkeby: {
      url: `${ALCHEMY_RINKEBY_RPC_URL}`,
      kmsKeyId: KMS_STAGING_KEY_ID
    },
    hardhat: {
      allowUnlimitedContractSize: false
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/ZqMFqf2s0PTDKTFuym8Plj5vKRIS5Hf_`,
      accounts: [process.env.WALLET_PRIVATE_KEY]
    },
    mumbai: {
      url: process.env.MUMBAI_RPC,
      accounts: [process.env.WALLET_PRIVATE_KEY]
    },
    polygon: {
      url: process.env.POLYGON_RPC,
      accounts: [process.env.WALLET_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: `${ETHERSCAN_API_KEY}`
  },
  gasReporter: {
    coinmarketcap: COINMARKETCAP_API_KEY,
    currency: 'USD',
//    gasPrice: 25
  },
};

export default config;
