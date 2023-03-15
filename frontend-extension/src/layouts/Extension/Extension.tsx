import React from "react";
import styles from "./Extension.module.scss";
import Head from "next/head";

interface PageLayoutProps {
  children?: React.ReactNode;
}

const Extension: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className={styles["container"]}>
      <img src="./logos/novusys-logo.png" />
    </div>
  );
};

export default Extension;
