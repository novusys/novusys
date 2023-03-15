import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './Header.module.scss'



export default function Header() {
  return (
    <div className={styles['out__container']}>
      <div className={styles['left__container']}>
        <div className={styles['logo__container']}>
          <img src='./logos/novusys-logo.png'/>
        </div>
        <div className={styles['pages__container']}>
          <div>
            About
          </div>
          <div>
            Docs
          </div>
        </div>
      </div>
      <div className={styles['middle__container']}>
        <div>
            Tip The Project
          </div>
      </div>
      <div className={styles['right__container']}>
        <div>
          Login
        </div>
        <div>
          SignUp
        </div>
      </div>

    </div>
  )
}
