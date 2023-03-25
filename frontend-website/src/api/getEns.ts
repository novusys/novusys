import { useState } from "react";
import { ENS } from "@ensdomains/ensjs";
import { ethers } from "ethers";

export const getEns = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.g.alchemy.com/v2/ZqMFqf2s0PTDKTFuym8Plj5vKRIS5Hf_"
  );
  const fetchEns = async (address: string, callback: Function) => {
    const ENSInstance = new ENS();
    await ENSInstance.setProvider(provider);

    const profile = await ENSInstance.getProfile(
      address
    );

    console.log(profile)
    
    callback(profile);
  };

  return {
    fetchEns,
  };
};

// export default Theme
