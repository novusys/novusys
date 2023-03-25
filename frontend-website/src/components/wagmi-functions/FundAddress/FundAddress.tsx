import { parseEther } from "ethers/lib/utils.js";
import * as React from "react";
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
}

const FundAddress: React.FC<SendTransactionProps> = ({ value, address, setConfirm, cid }) => {
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
  console.log(chains)
  console.log(isLoading || !sendTransaction)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        switchNetwork?.(cid)
        // sendTransaction?.();
      }}
    >
      {
        chain != null ? chain.id != cid ? <div onClick={() => switchNetwork?.(cid)}>
          Switch Network
        </div> : <div onClick={() => sendTransaction?.()}>
          Prefund Address
        </div> : <></>
      }


      {/* <button disabled={isLoading || !to || !amount}>
        {isLoading ? "Sending..." : "Send"}

      </button> */}
      {isSuccess && (
        <div>
          Successfully sent {amount} ether to {to}
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </form>
  );
}

export default FundAddress