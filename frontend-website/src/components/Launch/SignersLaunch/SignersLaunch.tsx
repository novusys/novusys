import styles from './SignersLaunch.module.scss'
import { useConfig } from '@/api/config'
import BlurPaper from '@/layouts/Papers/BlurPaper/BlurPaper'
import { useAAInterface } from '@/api/aaInterface'
import { useUser } from '@auth0/nextjs-auth0/client'
import { ethers } from 'ethers'
import { configureChains, useAccount, useConnect, useDisconnect, usePrepareSendTransaction, useProvider, useSendTransaction, useSwitchNetwork, useWaitForTransaction } from 'wagmi'
import { parseEther } from 'ethers/lib/utils.js'
// import { InjectedConnector } from 'wagmi/dist/connectors/injected'
import { InjectedConnector } from 'wagmi/connectors/injected'
import FundAddress from '@/components/wagmi-functions/FundAddress/FundAddress'
import { P } from '@wagmi/core/dist/index-35b6525c'
import { walletAbi } from '@/abis/walletAbi'
import { useConfig } from '@/api/config'
import { useEffect, useState } from 'react'

interface RecoverySigner {
  name: string
  email: string
  address: string
}

interface ChainLaunchProps {
  cid: number
  custodial: string
  recoverySigners: Array<RecoverySigner>
  address:string
}

const SignersLaunch: React.FC<ChainLaunchProps> = ({ cid, custodial, recoverySigners, address }) => {
  // const { chains } = useConfig()
  const { sendTxn, getOp, checkAddress, waitTransaction } = useAAInterface()
  // const { user, error } = useUser();
  // const { address, isConnected } = useAccount()
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // })
  // const { disconnect } = useDisconnect()
  // const { pendingChainId, switchNetwork } =
  //   useSwitchNetwork()
  // const provider = useProvider();
  // const [usrAddress, setUsrAddress] = useState("")
  // const [status, setStatus] = useState(chains[cid].pm ? 'launching' : 'prefund')
  // const [prefunded, setPrefunded] = useState(false)
  // const [transaction, setTransaction] = useState("")
  const {chains} = useConfig()
  // const [alreadyDeployed, setAlreadyDeployed] = useState("0x")

  const provider = new ethers.providers.JsonRpcProvider(chains[cid].bundler);
  const walletContract = new ethers.Contract(address, walletAbi, provider);
  const encodedData = walletContract.interface.encodeFunctionData("initializeVoters",[["0x0eA9C41015399c5AffE15E0707eACbe637A14219", "0x1ac8DaE74a24Fd902e08747A5CB5A50D757e8755"]])
  
  const [status, setStatus] = useState("")

  console.log(provider)


  //@ts-ignore
  const op = () => getOp(user?.sub, address != "" ? address : "0x6d06Eb861809551087F5b37272f36ceF459C5338",
    ethers.utils.parseEther("0.01")._hex, "0x", chains[cid].bundler, chains[cid].entryPoint, chains[cid].factory, cid, (op: any) => {
      setUsrAddress(op.sender)
      console.log(op.sender)
      if (usrAddress != "") {
        checkAddress(usrAddress, provider, (v: string) => { setAlreadyDeployed(v) })
      }

    })
  const txn = () => {
    //@ts-ignore
    sendTxn(user?.sub, address != "" ? address : "0x6d06Eb861809551087F5b37272f36ceF459C5338",
      ethers.utils.parseEther("0.01")._hex, "0x", chains[cid].bundler, chains[cid].entryPoint, chains[cid].factory, cid, setStatus, (tx: string) => {
        if (tx != null) {
          console.log(tx)
          setTransaction(tx)
          waitTransaction(tx, provider, (r: any) => {
            if (r) {
              setStatus('success')
            } else {
              setStatus('fail')
            }
          })
          setStatus('launching')
        }
      }, provider)
  }

  const launchTxn = () => {
    
  }

  useEffect(() => {

  }, [])

  // useEffect(() => {

  // }, [transaction])



  return (
    <div className={styles['out__container']}>
      
    </div >
  )
}

export default SignersLaunch
