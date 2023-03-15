import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Extension from "@/layouts/Extension/Extension";

export default function Home() {
  return (
    <>
      <Head>
        <title>novusys wallet</title>
        <meta name="description" content="A wallet that grows with you." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Extension />
    </>
  );
}
