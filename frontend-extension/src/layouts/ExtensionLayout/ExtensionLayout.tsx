import React from "react";
import styles from "./ExtensionLayout.module.scss";
import Head from "next/head";

interface PageLayoutProps {
  children?: React.ReactNode;
}

const ExtensionLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return <div className={styles["container"]}>{children}</div>;
};

export default ExtensionLayout;
