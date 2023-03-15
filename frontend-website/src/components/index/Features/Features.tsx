import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './Features.module.scss'
import BasicContainer from '@/layouts/Containers/BasicContainer/BasicContainer'
import BlurPaper from '@/layouts/Papers/BlurPaper/BlurPaper'
import Key from '@material-design-icons/svg/outlined/vpn_key.svg'
import Bundle from '@material-design-icons/svg/outlined/group_work.svg'
import Group from '@material-design-icons/svg/outlined/groups.svg'
import Lock from '@material-design-icons/svg/outlined/lock.svg'
import Plant from '@material-design-icons/svg/outlined/nature.svg'
import Gift from '@material-design-icons/svg/outlined/redeem.svg'


export default function Features() {
  return (

    <BasicContainer>
      <BlurPaper>
        <div className={styles['out__container']}>
          <div className={styles['feature__container']}>
            <div className={styles['feature__icon']}>
              <Key viewBox="0 0 25 25" />
            </div>
            <div className={styles['feature__description']}>
              Your Choice in Key Management
            </div>
          </div>
          <div className={styles['feature__container']}>
            <div className={styles['feature__icon']}>
              <Bundle viewBox="0 0 25 25" />
            </div>
            <div className={styles['feature__description']}>
              Save on gas with transaction bundles
            </div>
          </div>
          <div className={styles['feature__container']}>
            <div className={styles['feature__icon']}>
              <Group viewBox="0 0 25 25" />
            </div>
            <div className={styles['feature__description']}>
              Easily configured social recovery
            </div>
          </div>
          <div className={styles['feature__container']}>
            <div className={styles['feature__icon']}>
              <Lock viewBox="0 0 25 25" />
            </div>
            <div className={styles['feature__description']}>
              Keep your digital assets secure
            </div>
          </div>
          <div className={styles['feature__container']}>
            <div className={styles['feature__icon']}>
              <Plant viewBox="0 0 25 25" />
            </div>
            <div className={styles['feature__description']}>
              Grow with your wallet
            </div>
          </div>
          <div className={styles['feature__container']}>
            <div className={styles['feature__icon']}>
              <Gift viewBox="0 0 25 25" />
            </div>
            <div className={styles['feature__description']}>
              Truely free airdrops with fee sponsors
            </div>
          </div>


        </div>
      </BlurPaper>
    </BasicContainer>
  )
}
