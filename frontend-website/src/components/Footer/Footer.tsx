import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './Footer.module.scss'
import ButtonOutline from '../Buttons/ButtonOutline/ButtonOutline'
import BluredContainer from '@/layouts/Containers/BluredContainer/BluredContainer'



export default function Footer() {
  return (
    <BluredContainer>
      
      <div className={styles['out__container']}>
      <img src='./assets/footer-image.png'/>
        </div>
      
    </BluredContainer>
  )
}
