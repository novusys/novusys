import React, { useState, useEffect, useContext } from "react";
import styles from "./TransactionPending.module.scss";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import { HttpRpcClient, SimpleAccountAPI } from "@account-abstraction/sdk";
import auth0_config from "../../scripts/auth0.json";
import { LandingCtx } from "../MainPopup/Popup";

interface TxnPendingProps {
  req: any; // Signature target, value, data, provider, epAddr, factoryAddr
  details: Details; // chain info, user wallet info, origin info for page details
}

type Details = {
  chainInfo: any;
  walletName: string;
  walletAddress: string;
  walletAvatar: string;
  originName: string;
  originAddress: string;
  originAvatar?: string;
  message: string;
  txnValue: string;
};

function abbrev(str: string) {
  if (!str.length) return "";
  if (str.slice(0, 2) != "0x") return str;
  return str.slice(0, 6) + "..." + str.slice(str.length - 4, str.length);
}

function getRandomBytes() {
  const rndArray = new Uint8Array(32);
  self.crypto.getRandomValues(rndArray);
  return rndArray;
}

function URLEnc(str: any) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function buf2Base64(randBytes: any) {
  return URLEnc(Buffer.from(String.fromCharCode.apply(null, [...new Uint8Array(randBytes)])).toString("base64"));
}

function getParameterByName(name: string, url = self.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

async function sha256(buffer: any) {
  let bytes = new TextEncoder().encode(buffer);
  return await self.crypto.subtle.digest("SHA-256", bytes);
}

const TxnPending: React.FC<TxnPendingProps> = (props: TxnPendingProps) => {
  const [status, setStatus] = useState("Pending"); // Pending, Failed, Completed
  const [txnHash, setHash] = useState("...");
  const { landingAction, setLandingAction } = useContext(LandingCtx);

  const getUserOpReceipt = async (
    userOpHash: string,
    provider: any,
    entryPoint: string,
    factoryAddress: string,
    sender: string,
    timeout = 30000,
    interval = 5000
  ) => {
    const sw = new SimpleAccountAPI({
      provider,
      entryPointAddress: entryPoint,
      //@ts-ignore
      owner: sender,
      factoryAddress,
    });
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

  // Fetches txn details after pinging M2M auth0
  async function sendTxn(req: any) {
    const inputBytes = getRandomBytes();
    const codeVerifier = buf2Base64(inputBytes);
    const codeChallenge = buf2Base64(sha256(codeVerifier));
    const redirectUrl = chrome.identity.getRedirectURL();

    const factoryAddr = req.body.factoryAddr;
    const epAddr = req.body.epAddr;

    let options = {
      response_type: "code",
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      client_id: auth0_config.AUTH0_CLIENT_ID,
      redirect_uri: redirectUrl + "?" + new URLSearchParams(req.body),
      audience: auth0_config.AUTH0_AUDIENCE,
      scope: "openid profile email",
    };

    let queryString = new URLSearchParams(options);
    let url = `https://${auth0_config.AUTH0_DOMAIN}/authorize?${queryString}`;

    const provider = new ethers.providers.JsonRpcProvider(
      "https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071"
    );

    return chrome.identity
      .launchWebAuthFlow({
        url,
        interactive: true,
      })
      .then(async (resultUrl) => {
        const data = getParameterByName("error_description", resultUrl);
        if (!data || data == "") {
          return { status: 404, message: "novusys wallet signature missing params", error: "M2M did not return payload" };
        }
        try {
          console.log(data);
          const op = JSON.parse(data);

          const chainId = await provider.getNetwork().then((net) => net.chainId);
          const client = new HttpRpcClient(
            "https://node.stackup.sh/v1/rpc/6380f138e4c833860d3cd29c4ddcd5c0367ac95b636ba4d64e103c2cc41c0071",
            "0x0576a174D229E3cFA37253523E645A78A0C91B57",
            chainId
          );
          const uoHash = await client.sendUserOpToBundler(op);
          const hash = await getUserOpReceipt(uoHash, provider, epAddr, factoryAddr, "0xc0f70D98eC6aD9767d49341dB57674F1E2305B87");
          if (!hash) {
            setHash("error fetching hash");
          } else {
            setHash(hash);
          }
          return { status: 200, message: "novusys wallet successfully sent txn", txnHash: hash };
        } catch (error) {
          return { status: 400, message: "novusys wallet error while sending txn", error: error, data: data };
        }
      })
      .catch((error) => {
        console.log(error);
        return { status: 400, message: "novusys wallet error while sending txn", error: error };
      });
  }

  async function fetchTxn(hash: string) {
    const rpcURL = "https://eth-goerli.g.alchemy.com/v2/m3R-aaa3X67lEKyNjQu3aL6Zg2x-4gJX";
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    await provider
      .getTransaction(hash)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    sendTxn(props.req)
      .then((res) => {
        console.log(res);
        if (res && res.status == 200) {
          setStatus("Completed");
        } else {
          setStatus("Failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getStatus = () => {
    switch (status) {
      case "Pending":
        return styles["txn__pending"];
      case "Completed":
        return styles["txn__completed"];
      default:
        return styles["txn__failed"];
    }
  };

  const renderState = (req: any, txn: Details) => {
    return (
      <div className={styles["outer__container"]}>
        <div className={styles["user__container"]}>
          <img className={styles["user__avatar"]} src={txn.walletAvatar} alt="" />
          <div className={styles["account__details"]}>
            <div>{txn.walletName}</div> <div>{txn.walletAddress}</div>
          </div>
          <div className={styles["chain__container"]}>{txn.chainInfo.chain}</div>
        </div>
        <div className={styles["txn__container"]}>
          <div className={styles["txn__details"]}>
            <div className={styles["txn__status"]}>
              <div className={styles["status__title"]}>Status:</div>
              <div className={getStatus()}>{status}</div>
            </div>
            <div className={styles["txn__details"]}>
              <div className={styles["details__title"]}>Details:</div>
              <ul className={styles["details__body"]}>
                <li></li>
                <li className={styles["txn__hash__container"]}>
                  <div className={styles["txn__hash__title"]}>Txn Hash:</div>
                  {txnHash == "..." ? (
                    <>{txnHash}</>
                  ) : (
                    <button
                      className={styles["txn__hash__button"]}
                      onClick={() => {
                        navigator.clipboard.writeText(txnHash);
                      }}
                    >
                      {abbrev(txnHash)}
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles["txn__actionbar"]}>
          <button onClick={() => setLandingAction("wallet")} className={styles["action__button"]}>
            Close Transaction
          </button>
        </div>
      </div>
    );
  };

  return <div className={styles["main__container"]}>{renderState(props.req, props.details)}</div>;
};

export default TxnPending;
