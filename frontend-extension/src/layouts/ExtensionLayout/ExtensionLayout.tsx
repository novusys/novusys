import React from "react";
import styles from "./ExtensionLayout.module.scss";

interface PageLayoutProps {
  children?: React.ReactNode;
}

const ExtensionLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return <div className={styles["main__container"]}>{children}</div>;
};

export default ExtensionLayout;
