import auth0_config from "./auth0.json";
import { Buffer } from "buffer";

function getRandomBytes() {
  const randArr = new Uint8Array(44);
  self.crypto.getRandomValues(randArr);
  return randArr;
}

function buf2Base64(buffer) {
  return Buffer(String.fromCharCode.apply(null, new Uint8Array(buffer)))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function getParameterByName(name, url = self.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

async function runSHA256(buffer) {
  let bytes = new TextEncoder().encode(buffer);
  return await self.crypto.subtle.digest("SHA-256", bytes);
}

async function callAuth0(accessToken) {
  const config = await getConfig();
  const headers = await fetchHeaders(accessToken);
}

async function fetchHeaders(accessToken) {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}

chrome.runtime.onMessage.addListener(async function (message, sender) {
  if (message.loginAuth0) {
    const redirectUrl = chrome.identity.getRedirectURL();
    // console.log("redirectUrl", redirectUrl);

    // Create the code_verifier needed for auth0
    // The logic below will create a Sha256 code challenge and use it to create the code_verifier
    // https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-the-authorization-code-flow-with-pkce#create-code-verifier
    const inputBytes = getRandomBytes();
    const verifier = buf2Base64(inputBytes);
    const shaHash = await runSHA256(verifier);
    const codeChallenge = buf2Base64(shaHash);
    // console.log("codeChallenge", codeChallenge);

    let options = {
      client_id: auth0_config.AUTH0_CLIENT_ID,
      redirect_uri: redirectUrl,
      response_type: "code",
      audience: auth0_config.AUTH0_AUDIENCE,
      scope: "openid",
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    };
    /**
     * Here we are creating a call to Chrome's identity framework in order to generate a code
     * This code will be used to then generate an Auth0 token
     * We would then likely store this access token within chrome.session.storage (need to double check docs for security)
     * By doing this we are able to keep the user logged in while the session is open (when browser is closed redo login)
     */
    let resultUrl = await new Promise((resolve, reject) => {
      let queryString = new URLSearchParams(options).toString();
      let url = `https://${auth0_config.AUTH0_DOMAIN}/authorize?${queryString}`;
      // console.log(url);
      chrome.identity.launchWebAuthFlow(
        {
          url,
          interactive: true,
        },
        (callbackUrl) => {
          // console.log(callbackUrl);
          resolve(callbackUrl);
        }
      );
    });

    if (resultUrl) {
      const code = getParameterByName("code", resultUrl);
      // console.log("code", code);
      // TODO: Handle rest of auth flow with auth0 access token fetching

      // Send a message back to Popup.tsx reporting the status of the login
      chrome.runtime.sendMessage({ loginResponse: true });
    } else {
      chrome.runtime.sendMessage({ loginResponse: false });
    }
  }
});

export {};
