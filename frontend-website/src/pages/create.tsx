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
import { useState } from 'react'
import ChainSelect from '@/components/create/ChainSelect/ChainSelect'
import KeySelect from '@/components/create/KeySelect/KeySelect'
import RecoverySigners from '@/components/create/RecoverySigners/RecoverySigners'
import SecurityFeatures from '@/components/create/SecurityFeatures/SecurityFeatures'
import ProfileCreate from '@/components/create/ProfileCreate/ProfileCreate'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useUser } from '@auth0/nextjs-auth0/client'


function Create() {
  const { user, error, isLoading } = useUser();

  const [chains, setChains] = useState([])

  const [keyManagement, setKeyManagement] = useState("cust")
  const [publicKey, setPublicKey] = useState("")

  const [recoverySigners, setRecoverySigners] = useState([{ name: "", type: "email", value: "" }])

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

  return (
    <>
      <Head>
        <title>Novusys Smart Wallets</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <div className={styles['launch__button']}>
            Launch your Smart Wallet
          </div>
        </BluredContainer>

      </PageLayout>

    </>
  )
}

// export default withPageAuthRequired(Create);
export const getServerSideProps = withPageAuthRequired()
export default Create
