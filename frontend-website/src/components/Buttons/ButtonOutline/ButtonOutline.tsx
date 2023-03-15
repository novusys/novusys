import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './ButtonOutline.module.scss'

interface ButtonProps {
  text: string
}

const ButtonOutline: React.FC<ButtonProps> = ({text}) => {
  return (
    <div className={styles['out__container']}>
      <div className={styles['text__container']}>
        {text}
      </div>
    </div>
  )
}

export default ButtonOutline
