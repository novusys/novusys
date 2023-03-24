/**
 * Handler that will be called during the execution of a PostUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that has registered.
 * @param {PostUserRegistrationAPI} api - Methods and utilities to help change the behavior after a signup.
 */
const aaSdk = require("@account-abstraction/sdk");
const axios = require("axios").default;
const ethers = require("ethers");
const crypto = require("crypto");
// const AWS = require("aws-sdk");
require('dotenv').config()
const provider = new ethers.providers.JsonRpcProvider(
  "https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071"
);

const getUserOpReceipt = async (
  userOpHash,
  timeout = 30000,
  interval = 5000
) => {
  const endtime = Date.now() + timeout;
  const block = await provider.getBlock("latest");
  while (Date.now() < endtime) {
    // @ts-ignore
    const events = await sw.entryPointView.queryFilter(
      // @ts-ignore
      sw.entryPointView.filters.UserOperationEvent(userOpHash),
      Math.max(0, block.number - 100)
    );
    if (events.length > 0) {
      return events[0].transactionHash;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  return null;
};

async function getGasFee(provider){
  const [fee, block] = await Promise.all([
    provider.send("eth_maxPriorityFeePerGas", []),
    provider.getBlock("latest"),
  ]);
  const tip = ethers.BigNumber.from(fee);
  const buffer = tip.div(100).mul(13);
  const maxPriorityFeePerGas = tip.add(buffer);
  const maxFeePerGas = block.baseFeePerGas
    ? block.baseFeePerGas.mul(2).add(maxPriorityFeePerGas)
    : maxPriorityFeePerGas;

  return { maxFeePerGas, maxPriorityFeePerGas };
}

const func = async () => {
  const combo = "auth0|5f7c8ec7c33c6c004bbafe82" + "oTUK9I90zdsn03j7AYIrF7JhfHbBAowc";
  console.log(combo);

  // const sig = await signMessage(combo, keyId)
  // console.log(sig)
  const pk = crypto.createHash('sha256').update(combo).digest('hex');
  const wallet = new ethers.Wallet(pk, provider);
  console.log(wallet.address, pk);

  const signedMessage = await wallet.signMessage("test");
  // console.log(signedMessage)
  // const config = {
  //   chainId: await provider.getNetwork().then(net => net.chainId),
  //   entryPointAddress: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
  //   bundlerUrl: 'https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071'
  // }
  // const aaProvider = await wrapProvider(provider, config, wallet)
  // const walletAddress = await aaProvider.getSigner().getAddress()
  // console.log(walletAddress)

  // aaProvider
  // const myContract = new Contract(abi, aaProvider)

  const epAddr = "0x0576a174D229E3cFA37253523E645A78A0C91B57";
  const factoryAddr = "0x9315e1f3F9f44ebc3d1308F16b96279b8958E070";
  const pm = "";

  const walletAPI = new aaSdk.SimpleAccountAPI({
    provider: provider,
    entryPointAddress: epAddr,
    owner: wallet,
    factoryAddress: factoryAddr
  });
  console.log("init code", await walletAPI.getAccountInitCode())
  console.log("GAS:", await getGasFee(provider))

  const op = await walletAPI.createSignedUserOp({
    target: "0x6d06Eb861809551087F5b37272f36ceF459C5338",
    value: ethers.utils.parseEther("0.01"),
    data: "0x",
    ...(await getGasFee(provider)),
  });
  
  console.log(op);

  const chainId = await provider.getNetwork().then((net) => net.chainId);
  const client = await new aaSdk.HttpRpcClient("https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071", "0x0576a174D229E3cFA37253523E645A78A0C91B57", chainId)
  const uoHash = await client.sendUserOpToBundler(op)
  console.log(uoHash)
}



func()