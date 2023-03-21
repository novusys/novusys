console.info("novusys wallet content script");
import { handleTokenRequest, getTokenSilently } from "auth0-web-extension";

handleTokenRequest("http://localhost:3000");

export {};
