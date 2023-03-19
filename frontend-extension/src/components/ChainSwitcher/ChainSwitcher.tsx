import React, { useState, useEffect, useRef } from "react";
import styles from "./ChainSwitcher.module.scss";

// Basic tempalte for now
interface Chain {
  chainID: number;
  address: string;
  name: string;
  icon: string;
}

// Event Listener to close drop down menu
function clickOutside(ref: any, setOnOutsideClick: (state: boolean) => void) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOnOutsideClick(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setOnOutsideClick]);
}

export default function ChainSwitcher() {
  // Logic for the drop down menu
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(!open);
  };

  // Handles outside clicks to close drop down menu
  const menuRef = useRef<HTMLDivElement>(null);
  clickOutside(menuRef, setOpen);

  // Likely set to null here at startup or load most recently used chain for wallet
  const [chain, setChain] = useState<string | undefined>("Ethereum Mainnet");

  const handleMenuItemClick = (item: Chain) => {
    setChain(item.name);
    setOpen(!open);
    // Update wallet state
  };

  // Chains to import can be ones that the user has interacted with our contracts

  // May need to implement a char limit for chain name to prevent it from breaking the styles of the header
  // Not super important but something to consider later
  const chainItems: Chain[] = [
    { chainID: 1, name: "Ethereum Mainnet", address: "", icon: "" },
    { chainID: 137, name: "Polygon Mainnet", address: "", icon: "" },
    { chainID: 10, name: "Optimism", address: "", icon: "" },
  ];

  return (
    <div ref={menuRef} className={styles["main__container"]}>
      <button className={[open ? styles["active"] : "", styles["switcher__button"]].join(" ")} onClick={handleMenuClick}>
        {chain} ▼
      </button>
      {open && (
        <ul className={styles["switcher__menu"]}>
          {chainItems.map((item: Chain) => {
            return (
              <button className={styles["switcher__item"]} onClick={() => handleMenuItemClick(item)}>
                {chain == item.name ? (
                  <div className={styles["item__selected"]}>☄️ {item.name}</div>
                ) : (
                  <div className={styles["item__unselected"]}>{item.name}</div>
                )}
              </button>
            );
          })}
        </ul>
      )}
    </div>
  );
}
