import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/wallet-test.module.scss'
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
import { useConfig } from '@/api/config'

interface RecoverySigner {
    name: string
    email: string
    address: string
}


function Profile() {

    const [userMetdata, setUserMetadata] = useState({})


    const [submitting, setSubmitting] = useState(false)

    const { user, error, isLoading } = useUser();
    const { address, isConnected } = useAccount()
    const { chains } = useConfig()

    const [keyManagement, setKeyManagement] = useState("cust")
    const [publicKey, setPublicKey] = useState("")

    const [recoverySigners, setRecoverySigners] = useState([{ name: "", email: "", address: "" }])


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
                        {/* RETURN USERS NICKNAME AND WALLET ADDRESS FROM EXTENSION CONNECT */}
                        Welcome back <a>{user?.nickname}</a>
                    </div>
                </div>

                <BluredContainer>
                    <div className={styles['testing__container']}>
                        <div className={styles['launch__button']} onClick={() => {}}>
                            Launch your Smart Wallet
                        </div>
                    </div>
                </BluredContainer>

            </PageLayout>


        </>
    )
}

// export default withPageAuthRequired(Create);
// export const getServerSideProps = withPageAuthRequired()
export default Profile
