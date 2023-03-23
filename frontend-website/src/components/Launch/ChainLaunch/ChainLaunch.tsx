import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './ChainLaunch.module.scss'
import ButtonOutline from '../Buttons/ButtonOutline/ButtonOutline'
import { useConfig } from '@/api/config'

interface ChainLaunchProps {
  cid: number
}

const ChainLaunch: React.FC<ChainLaunchProps> = ({ cid }) => {
  const { chains } = useConfig()
  return (
    <div className={styles['out__container']}>
      <div className={styles['left__container']}>
        <img src={chains[cid].logo} />
        {chains[cid].chain}
      </div>

      <div className={styles['right__container']}>

      </div>

    </div>
  )
}

export default ChainLaunch