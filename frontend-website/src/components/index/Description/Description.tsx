import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './Description.module.scss'
import BasicContainer from '@/layouts/Containers/BasicContainer/BasicContainer'
import BlurPaper from '@/layouts/Papers/BlurPaper/BlurPaper'
import Key from '@material-design-icons/svg/outlined/vpn_key.svg'
import Bundle from '@material-design-icons/svg/outlined/group_work.svg'
import Group from '@material-design-icons/svg/outlined/groups.svg'
import Lock from '@material-design-icons/svg/outlined/lock.svg'
import Plant from '@material-design-icons/svg/outlined/nature.svg'
import Gift from '@material-design-icons/svg/outlined/redeem.svg'
import BluredContainer from '@/layouts/Containers/BluredContainer/BluredContainer'


export default function Description() {
  return (

    <BluredContainer>
      <div className={styles['out__container']}>
        <div className={styles['header__container']}>
          <div>
            <img src='./logos/novusys-leaf.png' />
          </div><div className={styles['header__title']}>What Is <a>novusys</a>?</div></div>
        <div className={styles['content']}>
          <div>Novusys is a modern and secure wallet provider that offers users a cutting-edge experience in the Ethereum ecosystem. With Novusys, users have access to all the standard wallet features, including the ability to securely store and manage their Ethereum assets. Additionally, Novusys has implemented EIP 4337, which allows for gas fee payment using tokens, making transactions even more efficient and cost-effective.</div>
          <div>At Novusys, security and growth are at the forefront of everything we do. Our wallet has been designed with the latest security protocols to keep our users' assets safe from potential hacks and attacks. Moreover, Novusys is committed to continuously improving and innovating to keep up with the ever-changing Ethereum ecosystem.</div>
          <div>The name Novusys was inspired by the Latin word "novus," meaning new or innovative, and "sys," short for system. We believe our name represents our commitment to creating a modern and innovative wallet system that provides users with the best possible experience.</div>
          <div>Choose Novusys as your go-to wallet provider for a secure, efficient, and innovative experience in the Ethereum ecosystem.</div>
        </div>
      </div>
    </BluredContainer>
  )
}
