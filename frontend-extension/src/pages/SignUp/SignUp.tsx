import React from "react";
import styles from "./SignUp.module.scss";
import Header from "@/components/Header/Header";

interface SignUpProps {
  setLogin: (state: boolean) => void;
  activeWallet: (state: boolean) => void;
  setLanding: (action: string) => void;
}

const SignUp: React.FC<SignUpProps> = (props: SignUpProps) => {
  return (
    <>
      <Header showTools={false} setLogin={props.setLogin} activeWallet={props.activeWallet} setLanding={props.setLanding} />
      <div className={styles["main__container"]}>Sign Up</div>
    </>
  );
};

export default SignUp;
