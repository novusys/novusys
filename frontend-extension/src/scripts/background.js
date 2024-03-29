import auth0_config from "./auth0.json";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import { chains } from "./chains";

// Used to generate a random 'state' to reduce vulnerability to CSRF attacks
// Passed into the code challenge options and checked after getting code
function generateShortUUID() {
  return Math.random().toString(36).substring(2, 15);
}

function getRandomBytes() {
  const rndArray = new Uint8Array(32);
  self.crypto.getRandomValues(rndArray);
  return rndArray;
}

function URLEnc(str) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function buf2Base64(randBytes) {
  return URLEnc(Buffer.from(String.fromCharCode.apply(null, new Uint8Array(randBytes))).toString("base64"));
}

function getParameterByName(name, url = self.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

async function sha256(buffer) {
  let bytes = new TextEncoder().encode(buffer);
  return await self.crypto.subtle.digest("SHA-256", bytes);
}

function abbrev(str) {
  if (!str.length) return "";
  if (str.slice(0, 2) != "0x") return str;
  return str.slice(0, 6) + "..." + str.slice(str.length - 4, str.length);
}

async function checkAccessToken() {
  const storageToken = await chrome.storage.session.get("USER_ACCESS_TOKEN");
  if (storageToken && storageToken.USER_ACCESS_TOKEN) {
    const storageExpiry = await chrome.storage.session.get("USER_TOKEN_EXPIRES_AT");
    const isExpired = storageExpiry.USER_TOKEN_EXPIRES_AT - new Date().getTime() <= 0;
    if (isExpired) {
      return { status: 401, messsage: "novusys wallet access token expired" };
    } else {
      return { status: 200, message: "novusys wallet valid access token found" };
    }
  } else {
    return { status: 404, messsage: "novusys wallet access token not found" };
  }
}

// Calls the auth0 /userinfo endpoint and assumes access token has been set
async function fetchUserInfo() {
  if ((await checkAccessToken()).status != 200) {
    return { status: 401, message: "novusys wallet could not fetch user info without valid access token" };
  }

  const storageToken = await chrome.storage.session.get("USER_ACCESS_TOKEN");
  return fetch(`https://${auth0_config.AUTH0_DOMAIN}/userinfo`, {
    method: "POST",
    headers: { Authorization: `Bearer ${storageToken.USER_ACCESS_TOKEN}` },
  })
    .then((response) => response.json())
    .then(async (data) => {
      await chrome.storage.session.set({ USER_DATA: data });
      return { status: 200, message: `novusys wallet successfully fetched user info` };
    })
    .catch((error) => {
      return { status: 401, message: `novusys wallet ${error}` };
    });
}

// Get Auth0 Access Token
// https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-the-authorization-code-flow-with-pkce#example-post-to-token-url
async function handleAuth0Login() {
  // Before re-running access token oauth flow, check if there is already a valid access token in storage
  if ((await checkAccessToken()).status == 200) {
    setTimeout(async () => {
      await fetchUserInfo();
      return { status: 200, message: "novusys wallet access token still alive" };
    }, 1000);
  }
  const redirectUrl = chrome.identity.getRedirectURL();

  // https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-the-authorization-code-flow-with-pkce#create-code-verifier
  const state = generateShortUUID();
  const inputBytes = getRandomBytes();
  const codeVerifier = buf2Base64(inputBytes);
  const codeChallenge = buf2Base64(sha256(codeVerifier));

  let options = {
    response_type: "code",
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    client_id: auth0_config.AUTH0_CLIENT_ID,
    redirect_uri: redirectUrl,
    audience: auth0_config.AUTH0_AUDIENCE,
    scope: "openid profile email",
    state: state,
  };
  /**
   * Here we are creating a call to Chrome's identity framework in order to generate a code
   * This code will be used to then generate an Auth0 access token
   */
  let queryString = new URLSearchParams(options).toString();
  let url = `https://${auth0_config.AUTH0_DOMAIN}/authorize?${queryString}`;

  return chrome.identity
    .launchWebAuthFlow({
      url,
      interactive: true,
    })
    .then((resultUrl) => {
      if (resultUrl) {
        const code = getParameterByName("code", resultUrl);
        const stateReceived = getParameterByName("state", resultUrl);
        if (code && stateReceived == state) {
          return fetch(`https://${auth0_config.AUTH0_DOMAIN}/oauth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              grant_type: "authorization_code",
              client_id: auth0_config.AUTH0_CLIENT_ID,
              code_verifier: codeVerifier,
              code: code,
              redirect_uri: redirectUrl,
              scope: "openid profile email",
            }),
          })
            .then((response) => response.json())
            .then(async (data) => {
              // Calculate expiry date to check validity of access token later (unix timestamp)
              const expires_at = JSON.stringify(data.expires_in * 1000 + new Date().getTime());
              await chrome.storage.session.set({ USER_ACCESS_TOKEN: data.access_token });
              await chrome.storage.session.set({ USER_ID_TOKEN: data.id_token });
              await chrome.storage.session.set({ USER_TOKEN_EXPIRES_AT: expires_at });
              await chrome.storage.local.set({ NOVUSYS_INIT: true });
              await chrome.storage.session.set({ NOVUSYS_LOGGED_IN: true });

              // Run if user info is needed
              await fetchUserInfo();

              return { status: 200, message: "novusys wallet successfully authenticated" };
            })
            .catch((error) => {
              return { status: 401, message: `novusys wallet ${error}` };
            });
        } else {
          return {
            status: 403,
            message: "novusys wallet States do not match (CSRF Prevention)",
          };
        }
      } else {
        return { status: 400, message: "novusys wallet Error while calling chrome identity" };
      }
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, message: "novusys wallet User cancelled auth0 request" };
    });
}

// Called when user specifies they want to reset their wallet (complete sign out to use a new account)
// See handleAuth0Logout for a soft logout that doesn't reset chrome identity auth token
async function handleAuth0Reset() {
  chrome.identity
    .launchWebAuthFlow({ url: `https://${auth0_config.AUTH0_DOMAIN}/v2/logout?federated`, interactive: false })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {});

  await chrome.storage.session.remove("USER_ACCESS_TOKEN");
  await chrome.storage.session.remove("USER_ID_TOKEN");
  await chrome.storage.session.remove("USER_TOKEN_EXPIRES_AT");
  await chrome.storage.local.remove("NOVUSYS_INIT");
  await chrome.storage.session.remove("NOVUSYS_LOGGED_IN");
  return { status: 200, message: `novusys wallet successfully reset` };
}

// Handles a soft logout (auth tokens not reset)
async function handleAuth0Logout() {
  return fetch(`https://${auth0_config.AUTH0_DOMAIN}/v2/logout`)
    .then(async (res) => {
      await chrome.storage.session.set({ NOVUSYS_LOGGED_IN: false });
      return { status: 200, message: `novusys wallet successfully logged out` };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, message: `novusys wallet logout: ${error}` };
    });
}

// Was having issues with using the callback function so opting to just send a message back
// Instead of sending a loginSuccess: false message we make a new message type for it
// This is to avoid falsely entering listeners who interpret !message.logout as true when the message isn't for them
chrome.runtime.onMessage.addListener(async function (message) {
  if (message.loginAuth0) {
    const res = await handleAuth0Login();
    console.log(res);
    if (res && res.status == 200) {
      chrome.runtime.sendMessage({ loginSuccess: true });
    } else {
      chrome.runtime.sendMessage({ loginFailed: true });
    }
  } else if (message.logoutAuth0) {
    const res = await handleAuth0Logout();
    console.log(res);
    if (res && res.status == 200) {
      chrome.runtime.sendMessage({ logoutSuccess: true });
    } else {
      chrome.runtime.sendMessage({ logoutFailed: true });
    }
  } else if (message.resetAuth0) {
    const res = await handleAuth0Reset();
    console.log(res);
    if (res && res.status == 200) {
      chrome.runtime.sendMessage({ resetSuccess: true });
    } else {
      chrome.runtime.sendMessage({ resetFailed: true });
    }
  } else if (message.checkState) {
    const initWrapper = await chrome.storage.local.get("NOVUSYS_INIT");
    if (initWrapper && initWrapper.NOVUSYS_INIT) {
      chrome.runtime.sendMessage({ initValid: true });
    } else {
      chrome.runtime.sendMessage({ initInvalid: true });
    }

    const loggedWrapper = await chrome.storage.session.get("NOVUSYS_LOGGED_IN");
    if (loggedWrapper && loggedWrapper.NOVUSYS_LOGGED_IN) {
      chrome.runtime.sendMessage({ isLoggedIn: true });
    } else {
      chrome.runtime.sendMessage({ isLoggedOut: true });
    }
  }
});

chrome.runtime.onMessageExternal.addListener(async (message, sender, sendResponse) => {
  // Can be generalized to different func types via 'data' field
  // Also could simplify by having a lookup for epAddr and factoryAddr
  if (message.type === "EXTERNAL_SITE_TRANSFER") {
    const checkList = ["cid", "target", "value", "data", "provider", "epAddr", "factoryAddr", "withPm"];
    const txn = message.data;
    if (!txn) {
      sendResponse({ message: "Please send a data payload" });
      return;
    }

    for (const check of checkList) {
      if (!Object.hasOwn(txn.body, check)) {
        sendResponse({ message: "Txn missing param(s)", error: `${check} is missing from data payload` });
        return;
      }
    }

    const amount = txn.body.value;
    txn.body.value = ethers.utils.parseEther(amount)._hex;

    const details = {
      chainInfo: chains[txn.body.cid],
      originName: "novusys",
      originAddress: "0x45d0f...7ca5ECD",
      originAvatar: "/logos/novusys-leaf.png",
      target: txn.body.target,
      message: `Transfer ${amount} to ${abbrev(txn.body.target)}`,
      txnValue: txn.body.value,
    };
    console.log("Received transfer txn request ", txn);
    await chrome.storage.session.set({ CURRENT_TXN: { req: txn, details: details } });
    await chrome.storage.session.set({ EXTERNAL_OVERRIDE: "transfer" });
    try {
      chrome.windows.create(
        {
          focused: true,
          width: 357,
          height: 600,
          type: "popup",
          url: "popup.html",
        },
        () => {
          console.log("Popup Opened");
          chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.walletShown) {
              chrome.runtime.sendMessage({ externalTransfer: true });
            }
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
});

export {};
