import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './Header.module.scss'
import ButtonOutline from '../Buttons/ButtonOutline/ButtonOutline'
import DarkMode from '@material-design-icons/svg/outlined/dark_mode.svg'
import { useUser } from '@auth0/nextjs-auth0/client';
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import ProfileChip from '../Chips/ProfileChip/ProfileChip'


export default function Header() {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log("user", user)
  return (
    <div className={styles['out__container']}>
      <div className={styles['left__container']}>
        <div className={styles['logo__container']}>
          <img src='./logos/novusys-logo.png' />
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
      {user == undefined ?
        <div className={styles['right__container']}>
          <div>
            Login
          </div>
          <div className={styles['signup__container']}>
            <ButtonOutline text='SignUp' onClick={() => { window.location.href = "/api/auth/login" }} />
            <div className={styles['icon__container']}>
              <DarkMode viewBox="0 0 25 25" />
            </div>
          </div>

        </div> :
        <div className={styles['right__container']}>
           <div onClick={()=>{window.location.href = '/create'}}>
            Launch a Wallet
          </div>
          <div className={styles['signup__container']}>
            <ProfileChip name={''} logo={''} onClick={undefined}/>
            {/* <ButtonOutline text='Launch a Wallet' onClick={() => { window.location.href = '/create' }} /> */}
            <ThemeToggle/>
          </div>

        </div>
      }

    </div>
  )
}
