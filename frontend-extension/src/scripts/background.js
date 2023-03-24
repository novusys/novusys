import auth0_config from "./auth0.json";
import { Buffer } from "buffer";

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

// Get Auth0 Access Token
// https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-the-authorization-code-flow-with-pkce#example-post-to-token-url
// By default access tokens have a 24 hour lifetime but that can be changed
async function handleAuth0Login() {
  // Before re-running access token oauth flow, check if there is already a valid access token in storage
  const storageToken = await chrome.storage.session.get("USER_ACCESS_TOKEN");
  if (storageToken && storageToken.USER_ACCESS_TOKEN) {
    const storageExpiry = await chrome.storage.session.get("USER_TOKEN_EXPIRES_AT");
    const isExpired = storageExpiry.USER_TOKEN_EXPIRES_AT - new Date().getTime() <= 0;
    if (!isExpired) {
      await chrome.storage.session.set({ NOVUSYS_LOGGED_IN: true });
      return { status: 200, message: "novusys wallet valid access token still alive" };
    }
  }
  const redirectUrl = chrome.identity.getRedirectURL();

  // Create the code_verifier needed for auth0
  // The logic below will create a Sha256 code challenge and use it to create the code_verifier
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
    scope: "offline_access openid profile email",
    state,
  };
  /**
   * Here we are creating a call to Chrome's identity framework in order to generate a code
   * This code will be used to then generate an Auth0 token
   * We would then likely store this access token within chrome.session.storage (need to double check docs for security)
   * By doing this we are able to keep the user logged in while the session is open (when browser is closed redo login)
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
        const state_received = getParameterByName("state", resultUrl);
        if (state_received == state && code) {
          return fetch(`https://${auth0_config.AUTH0_DOMAIN}/oauth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              redirect_uri: redirectUrl,
              grant_type: "authorization_code",
              client_id: auth0_config.AUTH0_CLIENT_ID,
              code_verifier: codeVerifier,
              code,
              scope: "offline_access openid profile email",
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
    console.log("log wrapper", loggedWrapper);
    if (loggedWrapper && loggedWrapper.NOVUSYS_LOGGED_IN) {
      chrome.runtime.sendMessage({ isLoggedIn: true });
    } else {
      chrome.runtime.sendMessage({ isLoggedOut: true });
    }
  }
});

export {};
