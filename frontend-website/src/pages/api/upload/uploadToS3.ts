import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import axios from "axios";
require("dotenv").config();

const s3 = new S3({
  region: "us-west-2",
  accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
  secretAccessKey: process.env.AWS_IAM_SECRET_KEY,
  signatureVersion: "v4",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("CALLED");
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // console.log(typeof req.body);
    let { name, type } = req.body;
    console.log(type, req.body)
    // let name = req.body.name
    // let type = req.body.type
    // console.log(name, type);
    const fileParams = {
      Bucket: "test.soulbound",
      Key: name,
      Expires: 600,
      ContentType: type,
      ACL: "public-read"
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    console.log("TEST?ING")
    // let { data: newData } = await axios.put(url, file, {
    //   headers: {
    //     "Content-type": file.type,
    //     "Charset": "utf-8",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // });
    // console.log(newData);

    res.status(200).json({ url });
  } catch (err) {
    console.log("ERROR",err);
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};
