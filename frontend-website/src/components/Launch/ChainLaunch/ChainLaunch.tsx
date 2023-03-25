import styles from './ChainLaunch.module.scss'
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
import { useEffect, useState } from 'react'
import SignersLaunch from '../SignersLaunch/SignersLaunch'

interface RecoverySigner {
  name: string
  email: string
  address: string
}


interface ChainLaunchProps {
  cid: number
  custodial: string
  recoverySigners: Array<RecoverySigner>
}

const ChainLaunch: React.FC<ChainLaunchProps> = ({ cid, custodial, recoverySigners }) => {
  const { chains } = useConfig()
  const { sendTxn, getOp, checkAddress, waitTransaction, approveSigners } = useAAInterface()
  const { user, error } = useUser();
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { pendingChainId, switchNetwork } =
    useSwitchNetwork()
  const provider = useProvider();
  const [usrAddress, setUsrAddress] = useState("")
  const [status, setStatus] = useState(chains[cid].pm ? 'launching' : 'prefund')
  const [prefunded, setPrefunded] = useState(false)
  const [transaction, setTransaction] = useState("")

  const [alreadyDeployed, setAlreadyDeployed] = useState("0x")

  const [initTxn, setInitTxn] = useState("")
  const addressesList = recoverySigners.map(a => a.address);
  // console.log(provider)



  //@ts-ignore
  const op = () => getOp(user?.sub, address != "" ? address : "0x6d06Eb861809551087F5b37272f36ceF459C5338",
    ethers.utils.parseEther("0.01")._hex, "0x", chains[cid].bundler, chains[cid].entryPoint, chains[cid].factory, cid, (op: any) => {
      setUsrAddress(op.sender)
      console.log(op.sender)


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
              approveSigs()
            } else {
              setStatus('fail')
            }
          })
          setStatus('launching')
        }
      }, provider)
  }

  const approveSigs = () => {
    console.log("approvesig")
    approveSigners(user?.sub, usrAddress, ethers.utils.parseEther("0")._hex, chains[cid].bundler, chains[cid].entryPoint, chains[cid].factory, cid, (op: any) => { setInitTxn(op) }, provider, addressesList)
  }

  useEffect(() => {
    op()

  }, [address])

  useEffect(() => {
    if (usrAddress != "") {
      checkAddress(usrAddress, provider, (v: string) => {
        setAlreadyDeployed(v)
        // if(v != "0x"){
        //   approveSigs()
        // }
      })
    }
  }, [usrAddress])



  return (
    <>
      <div className={styles['out__container']}>
        <div className={styles['left__container']}>
          <img src={chains[cid].logo} className={styles['chain__logo']} />
          {chains[cid].chain}
        </div>
        <div className={styles['middle__container']} onClick={() => { window.open(chains[cid].explorer + "address/" + usrAddress, "_blank") }}>
          {
            chains[cid].pm ? <>Loading... </> :
              <>{usrAddress}</>
          }
        </div>
        {
          alreadyDeployed == "0x" ?

            <div className={styles['right__container']}>
              <BlurPaper>
                {
                  status == 'launch contract' ? <div className={styles['status__blurb']} onClick={custodial == "cust" ? () => { txn() } : () => { }}>
                    Launch Contract
                  </div> :
                    <></>
                }

                {
                  status == 'processing' ? <div className={styles['status__blurb__loading']}>
                    Processing Txn....
                  </div> :
                    <></>
                }
                {status == "fail" ?
                  <div className={styles['status__blurb']} onClick={() => window.open(chains[cid].explorer + "tx/" + transaction, "_blank")}>
                    {/* {transaction.slice(0, 5) + "..." + transaction.slice(50,)} */}
                    Failed
                  </div> :
                  <></>
                }
                {status == "success" ?
                  <div className={styles['status__blurb']} onClick={() => window.open(chains[cid].explorer + "tx/" + transaction, "_blank")}>
                    {/* {transaction.slice(0, 5) + "..." + transaction.slice(50,)} */}
                    Success!
                  </div> :
                  <></>
                }
                {status == "launching" ?
                  <div className={styles['status__blurb']} onClick={() => window.open(chains[cid].explorer + "tx/" + transaction, "_blank")}>
                    {/* {transaction.slice(0, 5) + "..." + transaction.slice(50,)} */}
                    View on BlockScan
                  </div> :
                  <></>
                }
                {
                  status == "prefund" ?

                    isConnected ?
                      <div className={styles['status__blurb']} onClick={() => {

                      }}>
                        {
                          usrAddress == "" ? <>Loading... </> :
                            <FundAddress explorer={chains[cid].explorer} cid={cid} value={chains[cid].launchPrice} address={usrAddress} setConfirm={() => { setStatus("launch contract") }} />
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
            :

            <div className={styles['right__container']}>
              <BlurPaper>
                <div className={styles['status__blurb']}>
                  Already Deployed!
                </div>


              </BlurPaper>
            </div>
        }

      </div >
      {initTxn != "" ?
        <div className={styles['signer__init']}> Signer Initalization Transaction: <a onClick={()=>{window.open(chains[cid].explorer+"tx/"+initTxn), "_blank"}}>{initTxn}</a></div> : <></>
      }


    </>
  )
}

export default ChainLaunch
