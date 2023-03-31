import { withApiAuthRequired, getSession, getAccessToken } from "@auth0/nextjs-auth0";
import axios from "axios";
import { ethers } from "ethers";
var request = require("request");

//@ts-ignore
async function handle(req, res) {
  console.log("SIGNER HERE");
  let op = {};
  try {
    //${auth0_id}, "target": ${target}, "value": ${value}, "data": ${data}
    const auth0_id = req.body[0].auth0_id;
    const target = req.body[0].target;
    const value = req.body[0].value;
    const data = req.body[0].data;
    const provider = req.body[0].provider;
    const entryPoint = req.body[0].epAddr;
    const factory = req.body[0].factoryAddr;
    const withPm = req.body[0].withPm;
    const paymasterAddress = req.body[0].paymasterAddress;
    const cid = req.body[0].cid;

    // var options = {
    //   method: "POST",
    //   url: "https://dev-27jeufvx256r244q.us.auth0.com/oauth/token",
    //   headers: { "content-type": "application/json" },
    //   //data: `{"client_id":"ABwmvyCQC5livHyBhZl75nbkSS7fFolp","client_secret":"sNmIsJWbJRMUGmJKDbJtd1-IBt74PACG3M4sIKM90x1sDTZ9oozUi1-Afn80ZEz1","audience":"https://dev-27jeufvx256r244q.us.auth0.com/api/v2/","grant_type":"client_credentials","authParamsMap": {"auth0_id": "${auth0_id}", "target": "${target}", "value": "${value}", "data": "${data}"}}`,
    //   data: `{"client_id":"Hlrb9frZIsqmLiSuj5kZzEklmDLmIQJc","client_secret":"EmyGktwdBmRWymZjuSlQIs__DYBlchJ-HTg5AcN39qc4us4Qm_4dMRgFaknvTYjI","audience":"https://auth0-signing-server-website.com","grant_type":"client_credentials","authParamsMap": {"auth0_id": "${auth0_id}", "target": "${target}", "value": "${value}", "data": "${data}"}}`,
    // };
    // // axios.request(options).then(function (response){
    // //   console.log(response)
    // // }).catch(function (error){
    // //   console.log(error)
    // // })
    // await request(options, await async function (error, response, body) {

    //   const json = JSON.parse(body);
    //   op = json.error
    //   console.log(body)

    //   // console.log(json.access_token);
    //   // accessToken = json.access_token;
    // });
    var options = {
      method: "POST",
      url: "https://dev-27jeufvx256r244q.us.auth0.com/oauth/token",
      headers: { "content-type": "application/json" },
      body: `{"client_id":"Hlrb9frZIsqmLiSuj5kZzEklmDLmIQJc","client_secret":"EmyGktwdBmRWymZjuSlQIs__DYBlchJ-HTg5AcN39qc4us4Qm_4dMRgFaknvTYjI","audience":"https://dev-27jeufvx256r244q.us.auth0.com/api/v2/","grant_type":"client_credentials","authParamsMap": {"auth0_id": "${auth0_id}", "target": "${target}", "value": "${value}", "data": "${data}", "provider": "${provider}", "epAddr": "${entryPoint}", "factoryAddr":"${factory}", "withPm":"${withPm}", "paymasterAddress": "${paymasterAddress}", "cid": "${cid}"}}`,
    };

    //@ts-ignore
    await request(options, function (error, response, body) {
      // console.log(body, response)
      console.log(body, error);
      const json = JSON.parse(body);
      op = json.error;
      console.log(op);
      res.status(200).send(JSON.stringify(op));
    });
    // res.status(200).send(JSON.stringify(op));
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch", description: e });
  }
}

export default withApiAuthRequired(handle);
