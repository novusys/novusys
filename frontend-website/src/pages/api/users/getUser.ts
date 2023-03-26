import {
    withApiAuthRequired,
    getSession,
    getAccessToken,
  } from "@auth0/nextjs-auth0";
  import axios from "axios";
  import { ethers } from "ethers";
  var request = require("request");
  require('dotenv').config
  
  //@ts-ignore
  async function handle(req, res) {
    let op = {};
    try {
      //${auth0_id}, "target": ${target}, "value": ${value}, "data": ${data}
  

      
      // res.status(200).send(JSON.stringify(op));
    } catch (e) {
      res.status(500).json({ error: "Unable to fetch", description: e });
    }
  }
  
  export default withApiAuthRequired(handle);
  