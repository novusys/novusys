import { parseEther } from "ethers/lib/utils.js";
import * as React from "react";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import {
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";

interface SendTransactionProps {
  value: string
  address: string
  setConfirm: Function
  cid: number
  explorer: string
}

const FundAddress: React.FC<SendTransactionProps> = ({ value, address, setConfirm, cid, explorer }) => {
  const [to, setTo] = React.useState(address);
  const [debouncedTo] = useDebounce(to, 500);

  const [amount, setAmount] = React.useState(value);
  const [debouncedAmount] = useDebounce(amount, 500);

  const { chain } = useNetwork()
  const { chains, error, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
    },
  });
  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  // console.log(data)
  // console.log(chains)
  // console.log(isLoading || !sendTransaction)

  useEffect(() => {
    if (isSuccess) {
      setConfirm()
    }
  }, [isSuccess])
  return (
    <>
      {
        chain != null ? chain.id != cid ? <div onClick={() => switchNetwork?.(cid)}>
          Switch Network
        </div> : isLoading ?
          <div onClick={() => window.open(explorer + "tx/" + data?.hash, "_blank")}>
            Sending Funds...
          </div>
          :

          <div onClick={() => sendTransaction?.()}>
            Prefund Address
          </div> : <></>
      }
    </>




    // </form>
  );
}

export default FundAddress