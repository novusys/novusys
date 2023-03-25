import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './ChainLaunch.module.scss'
import ButtonOutline from '../Buttons/ButtonOutline/ButtonOutline'
import { useConfig } from '@/api/config'
import BlurPaper from '@/layouts/Papers/BlurPaper/BlurPaper'
import { useEffect, useState } from 'react'
import { useAAInterface } from '@/api/aaInterface'
import { stat } from 'fs'
import { useUser } from '@auth0/nextjs-auth0/client'
import { ethers } from 'ethers'
import { configureChains, useAccount, useConnect, useDisconnect, usePrepareSendTransaction, useSendTransaction, useSwitchNetwork, useWaitForTransaction } from 'wagmi'
import { parseEther } from 'ethers/lib/utils.js'
// import { InjectedConnector } from 'wagmi/dist/connectors/injected'
import { InjectedConnector } from 'wagmi/connectors/injected'
import FundAddress, { SendTransaction } from '@/components/wagmi-functions/FundAddress/FundAddress'
interface ChainLaunchProps {
  cid: number
}

const ChainLaunch: React.FC<ChainLaunchProps> = ({ cid }) => {
  const { chains } = useConfig()
  const { sendTxn, getOp } = useAAInterface()
  const { user, error } = useUser();
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { pendingChainId, switchNetwork } =
    useSwitchNetwork()

  const [usrAddress, setUsrAddress] = useState("")
  const [status, setStatus] = useState(chains[cid].pm ? 'launching' : 'prefund')
  const [prefunded, setPrefunded] = useState(false)

  // const { chains, provider } = configureChains(
  //   [mainnet, optimism],
  //   [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
  // )

  const op = () => getOp(user?.sub, "0x6d06Eb861809551087F5b37272f36ceF459C5338",
    ethers.utils.parseEther("0.01")._hex, "0x", chains[cid].bundler, chains[cid].entryPoint, chains[cid].factory, cid, (op) => {
      setUsrAddress(op.sender)
      console.log(op.sender)
    })
  const txn = () => {
    sendTxn(user?.sub, "0x6d06Eb861809551087F5b37272f36ceF459C5338",
      ethers.utils.parseEther("0.01")._hex, "0x", chains[cid].bundler, chains[cid].entryPoint, chains[cid].factory, cid)
  }

  op()
  // const { config } = usePrepareSendTransaction({
  //   request: {
  //     to: usrAddress,
  //     value: parseEther(".2"),
  //   },
  // })
  // const { data, sendTransaction } = useSendTransaction(config)

  // const { isLoading, isSuccess } = useWaitForTransaction({
  //   hash: data?.hash,
  // })

  return (
    <div className={styles['out__container']}>
      <div className={styles['left__container']}>
        <img src={chains[cid].logo} className={styles['chain__logo']} />
        {chains[cid].chain}
      </div>
      <div className={styles['middle__container']}>
        {
          chains[cid].pm ? <>Loading... </> :
            <>{usrAddress}</>
        }
      </div>

      <div className={styles['right__container']}>
        <BlurPaper>
          {status == "launching" ?
            <div className={styles['status__blurb__loading']}>
              Launching Contract....
            </div> :
            <></>
          }
          {
            status == "prefund" ?

              isConnected ?
                <div className={styles['status__blurb']} onClick={() => {
                  
                }}>
                  {
                    usrAddress == ""? <>Loading... </>:
                    <FundAddress cid= {cid} value={chains[cid].launchPrice} address={usrAddress} setConfirm={()=>{setStatus("Launch Contract")}}/>
                  }
                  
                  {/* Prefund Address */}
                </div> :
                <div className={styles['status__blurb']} onClick={() => connect()}>
                  Connect Wallet
                </div>

              : <></>
          }

        </BlurPaper>
      </div >

    </div >
  )
}

export default ChainLaunch