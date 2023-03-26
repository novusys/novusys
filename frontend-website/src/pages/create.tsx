import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Create.module.scss'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import LandingBanner from '@/components/index/LandingBanner/LandingBanner'
import BasicContainer from '@/layouts/Containers/BasicContainer/BasicContainer'
import BlurPaper from '@/layouts/Papers/BlurPaper/BlurPaper'
import Features from '@/components/index/Features/Features'
import BluredContainer from '@/layouts/Containers/BluredContainer/BluredContainer'
import Description from '@/components/index/Description/Description'
import LargeGap from '@/components/gaps/large/LargeGap'
import { create } from 'domain'
import { useEffect, useState } from 'react'
import ChainSelect from '@/components/create/ChainSelect/ChainSelect'
import KeySelect from '@/components/create/KeySelect/KeySelect'
import RecoverySigners from '@/components/create/RecoverySigners/RecoverySigners'
import SecurityFeatures from '@/components/create/SecurityFeatures/SecurityFeatures'
import ProfileCreate from '@/components/create/ProfileCreate/ProfileCreate'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useAccount } from 'wagmi'
import ChainLaunch from '@/components/Launch/ChainLaunch/ChainLaunch'
import { ethers } from 'ethers'
import axios from 'axios'
import ButtonOutline from '@/components/Buttons/ButtonOutline/ButtonOutline'

interface RecoverySigner {
  name: string
  email: string
  address: string
}


function Create() {

  const [userMetdata, setUserMetadata] = useState({})


  const [submitting, setSubmitting] = useState(false)

  const { user, error, isLoading } = useUser();
  const { address, isConnected } = useAccount()
  const [chains, setChains] = useState([])

  const [keyManagement, setKeyManagement] = useState("cust")
  const [publicKey, setPublicKey] = useState("")

  const [recoverySigners, setRecoverySigners] = useState([{ name: "", email: "", address: "" }])

  // useEffect(() => {
  //   if(user != null){
  //     var options = {
  //       method: "get",
  //       url: `https://dev-27jeufvx256r244q.us.auth0.com/api/v2/users-by-email`,
  //       params: {email: `${user.email}`},
  //       headers: {authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API}`}
  //     };

  //     //@ts-ignore
  //     axios.request(options).then(function (response) {
  //       setUserMetadata(response.data)
  //       console.log(response.data)
  //     }).catch(function (error) {
  //       console.error(error);
  //     });
  //   }
  // }, [user])


  const [securityFeatures, setSecurityFeatures] = useState({
    balance_multisig: {
      enabled: false,
      value: 0,
      address: ""
    },
    savings: {
      enabled: false,
      savings_percent: 30,
      address: ""
    }
  })

  const [profile, setProfile] = useState({
    display_name: "",
    display_title: "",
    display_desc: "",
    ens: "",
    discord: "",
    twitter: "",
    reddit: "",
    medium: "",
    instagram: "",
    nft: ""

  })

  const [errorList, setErrorList] = useState([])

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateInput = () => {
    const errors: Array<string> = []
    if (chains.length == 0) {
      errors.push("Please Select at Least 1 Chain")
    }
    if (keyManagement == "nonc" && !address) {
      errors.push("Please Connect a Wallet!")
    }
    for (let i = 0; i < recoverySigners.length; i++) {
      if (new Set(Object.values(recoverySigners[i])).has("")) {
        errors.push("Please fill out all Recovery Signer Fields")
        break
      }
      if (!validateEmail(recoverySigners[i].email)) {
        errors.push("Enter a Valid Email for: " + recoverySigners[i].name)
      }
      if (!ethers.utils.isAddress(recoverySigners[i].address)) {
        errors.push("Enter a Valid Address for: " + recoverySigners[i].name)
      }
    }
    if (securityFeatures['balance_multisig']['enabled'] && (securityFeatures['balance_multisig']['value'] <= 0 || securityFeatures['balance_multisig']['address'] == "")) {
      errors.push("Incorrect entries for multisig security features")
    }

    if (securityFeatures['savings']['enabled'] && (securityFeatures['savings']['savings_percent'] <= 0 || securityFeatures['savings']['savings_percent'] > 100 || !ethers.utils.isAddress(securityFeatures['savings']['address']))) {
      errors.push("Incorrect entries for multisig security features")
    }

    return errors
  }

  const renderErrors = () => {
    return errorList.map((e, index) => {
      return (
        <div key={index}>{e}</div>
      )
    })
  }

  const renderSubmitChain = (signers: Array<RecoverySigner>) => {
    return chains.map((c, index) => {
      return (
        <ChainLaunch recoverySigners={signers} custodial={keyManagement} cid={c} key={index} securityFeatures={securityFeatures} />
      )
    })
  }

  const submitLaunch = () => {
    const errors = validateInput()
    if (errors.length != 0) {
      //@ts-ignore
      setErrorList(errors)
      return
    }
    setSubmitting(true)

  }

  return (
    <>
      <Head>
        <title>Novusys Smart Wallets</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!submitting ?
        <PageLayout>
          <div className={styles['header__container']}>
            <div className={styles['title__container']}>
              Setup your <a>novusys</a> Smart Wallet
            </div>
          </div>
          <BluredContainer>
            <ChainSelect selectedChains={chains} setChains={setChains} />
            <LargeGap />
            <KeySelect keyManagement={keyManagement} setKeyManagement={setKeyManagement} />
            <LargeGap />
            <RecoverySigners recoverySigners={recoverySigners} setRecoverySigners={setRecoverySigners} />
            <LargeGap />
            <SecurityFeatures securityFeatures={securityFeatures} setSecurityFeatures={setSecurityFeatures} />
            <LargeGap />
            <ProfileCreate profile={profile} setProfile={setProfile} />
            <LargeGap />

            <div className={styles['launch__button']} onClick={() => { submitLaunch() }}>
              Launch your Smart Wallet
            </div>
            <div className={styles['error__container']}>
              {renderErrors()}
            </div>
          </BluredContainer>

        </PageLayout> : <PageLayout>
          <div className={styles['header__container']}>
            <div className={styles['title__container']}>
              Setup your <a>novusys</a> Smart Wallet
            </div>
          </div>
          <BluredContainer>
            <div className={styles['submit__container']}>
              {renderSubmitChain(recoverySigners)}
              <div className={styles['continue__button']} onClick={()=>{window.location.href = '/profile'}}>
                Continue
              </div>

            </div>

          </BluredContainer>

        </PageLayout>

      }

    </>
  )
}

// export default withPageAuthRequired(Create);
export const getServerSideProps = withPageAuthRequired()
export default Create
