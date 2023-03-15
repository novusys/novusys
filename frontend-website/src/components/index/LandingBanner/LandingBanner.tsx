import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './LandingBanner.module.scss'



export default function LandingBanner() {
  return (
    <div className={styles['out__container']}>
      <div className={styles['left__container']}>
        <div className={styles['headline__container']}>
          A WALLET
          THAT <a>GROWS </a>
          WITH YOU
        </div>
        <div className={styles['description__container']}>
        Experience a secure, recoverable, upgraded web3 wallet at your fingertips.  A new way to look at digital asset management thanks to <a href='https://eips.ethereum.org/EIPS/eip-4337'>EIP-4337</a> .
        </div>
      </div>
      <div className={styles['right__container']}>
        <img src='./logos/eg-diamond.png' className={styles['eth__diamond']} width="400px"></img>
      </div>

    </div>
  )
}
