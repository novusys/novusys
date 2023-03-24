import { useState } from "react";
import crypto from "crypto";
import axios from "axios";
import { useConfig } from "./config";
import { ethers } from "ethers";
const aaSdk = require("@account-abstraction/sdk");

interface chainsInfo {
  chain: string;
  id: number;
  logo: string;
  rpc: string;
  test: boolean;
}

interface chains {
  [key: number]: chainsInfo;
}

export const useAAInterface = () => {
  const getUserOpReceipt = async (
    userOpHash,
    provider,
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

  const sendTxn = async (
    auth0_id,
    target,
    value,
    data,
    providerUrl,
    entryPoint,
    factory,
    cid
  ) => {
    if(!(auth0_id&&target&&value&&data&&providerUrl&&entryPoint&&factory)){
        return "Error! Missing Provided Data"
    }
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const options = {
      method: "POST",
      url: "/api/sign/sign",
      params: { "api-version": "3.0" },
      headers: {
        "content-type": "application/json",
      },
      data: [
        {
          auth0_id: auth0_id,
          target: target,
          value: value,
          data: data,
        },
      ],
    };
    axios
      .request(options)
      .then(async function (response) {
        console.log(response.data);
        const chainId = await provider.getNetwork().then((net) => net.chainId);
        const client = await new aaSdk.HttpRpcClient(
          "https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071",
          "0x0576a174D229E3cFA37253523E645A78A0C91B57",
          chainId
        );
        const op = response.data;

        console.log(op);
        const uoHash = await client.sendUserOpToBundler(op);
        return await getUserOpReceipt(uoHash, provider);
      })
      .catch(function (error) {
        console.error(error);
        return error
      });
  };

  const getOp = async (
    auth0_id,
    target,
    value,
    data,
    providerUrl,
    entryPoint,
    factory,
    cid,
    callback
  ) => {
    if(!(auth0_id&&target&&value&&data&&providerUrl&&entryPoint&&factory)){
        return "Error! Missing Provided Data"
    }
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const options = {
      method: "POST",
      url: "/api/sign/sign",
      params: { "api-version": "3.0" },
      headers: {
        "content-type": "application/json",
      },
      data: [
        {
          auth0_id: auth0_id,
          target: target,
          value: value,
          data: data,
          
        },
      ],
    };
    axios
      .request(options)
      .then(async function (response) {
        console.log(response.data);
        const chainId = await provider.getNetwork().then((net) => net.chainId);
        const client = await new aaSdk.HttpRpcClient(
          "https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071",
          "0x0576a174D229E3cFA37253523E645A78A0C91B57",
          chainId
        );
        const op = response.data;

        callback(op)
      })
      .catch(function (error) {
        console.error(error);
        return error
      });
  };

;

  return {
    sendTxn,
    getOp,
};
};

// export default Theme
