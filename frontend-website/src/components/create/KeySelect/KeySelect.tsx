import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './KeySelect.module.scss'
import ButtonOutline from '../Buttons/ButtonOutline/ButtonOutline'
import { useConfig } from '@/api/config'
import ChainChip from '@/components/Chips/ChainChip/ChainChip'
import BlurPaper from '@/layouts/Papers/BlurPaper/BlurPaper'

import Password from '@material-design-icons/svg/outlined/password.svg'
import Key from '@material-design-icons/svg/outlined/key.svg'
interface KeySelectProps {
  keyManagement: string
  setKeyManagement: Function
}


const KeySelect: React.FC<KeySelectProps> = ({ keyManagement, setKeyManagement }) => {

  const { chains } = useConfig()
  console.log(keyManagement == "nonc")
  return (
    <div className={styles['out__container']}>
      <div className={styles['title__container']}>
        Choose your Key Management
      </div>
      <div className={styles['selector__container']}>
        <BlurPaper>
          <div className={keyManagement === "cust" ? styles['selected'] : styles['selector']} onClick={() => { setKeyManagement("cust") }}>
            <div className={styles['key__logo']}>
              <Password viewBox="0 0 25 25" />
            </div>
            <div className={styles['select__title']}>
              Custodial Key Management
            </div>
            <div className={styles['select__desc']}>
              Let Auth0 protect your private key. *recommended for beginners
            </div>
          </div>
        </BlurPaper>
        <BlurPaper>
          <div className={keyManagement === "nonc" ? styles['selected'] : styles['selector']} onClick={() => { setKeyManagement("nonc") }}> 
          <div className={styles['key__logo']}>
              <Key viewBox="0 0 25 25" />
            </div>
            <div className={styles['select__title']}>
              External Key Management
            </div>
            <div className={styles['select__desc']}>
            Manage your own keys with an EOA like MetaMask.            </div>
           </div>
        </BlurPaper>
      </div>

    </div>
  )
}

export default KeySelect
