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

// TODO: Implement Auth0 calls when frontend sends message
async function callAuth0(accessToken) {
  const config = await getConfig();
  const header = {
    Authorization: `Bearer ${accessToken}`,
  };
}

chrome.runtime.onMessage.addListener(async function (message, sender) {
  if (message.loginAuth0) {
    const redirectUrl = chrome.identity.getRedirectURL();
    // console.log("redirectUrl", redirectUrl);

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
          resolve(callbackUrl);
        }
      );
    });

    if (resultUrl) {
      const code = getParameterByName("code", resultUrl);
      // console.log("code", code);

      // Get Auth0 Access Token
      // https://auth0.com/docs/get-started/authentication-and-authorization-flow/call-your-api-using-the-authorization-code-flow-with-pkce#example-post-to-token-url
      // By default access tokens have a 24 hour lifetime but that can be changed
      fetch(`https://${auth0_config.AUTH0_DOMAIN}/oauth/token`, {
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
        .then((data) => {
          // Successful Access Token fetch
          // Likely store this token in the chrome session storage so we can access it and make auth0 calls later
          // console.log(data);
          chrome.runtime.sendMessage({ loginResponse: true });
        })
        .catch((error) => {
          console.error(error);
          chrome.runtime.sendMessage({ loginResponse: false });
        });
    } else {
      chrome.runtime.sendMessage({ loginResponse: false });
    }
    return true;
  }
});

export {};
