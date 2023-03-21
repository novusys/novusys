import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './ChainChip.module.scss'
import { useState } from 'react'

interface ChainProps {
  name: string
  logo: string
  onClick: Function
}

const ChainChip: React.FC<ChainProps> = ({ name, logo, onClick }) => {
  const [selected, setSelected] = useState(false)
  return (
    <div className={!selected ? styles['out__container'] : styles['out__container__selected']} onClick={() => {
      setSelected(!selected)
      onClick(!selected)
    }}>
      <img src={logo} className={styles['chain__logo']} />
      <div className={styles['chain__name']}>
        {name}
      </div>
    </div>
  )
}

export default ChainChip