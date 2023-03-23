import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './ProfileChip.module.scss'
import { useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

interface ChainProps {
  name: string
  logo: string
  onClick: Function
}

const ProfileChip: React.FC<ChainProps> = ({ name, logo, onClick }) => {
  const { user, error, isLoading } = useUser();
  const [selected, setSelected] = useState(false)
  return (
    <div className={styles['out__container']} >
      <div className={styles['user__container']}>
        <img src={user?.picture} className={styles['user__logo']} />
        <div className={styles['right__container']} >
          <div className={styles['nickname']}>
            {user?.nickname}
          </div>
          <div className={styles['email']}>
            {user?.email}
          </div>
        </div>
      </div>
      <div className={styles['expand']}>
        <div> Dashboard</div>
        <div> About</div>
        <div> Documentation</div>
        <div onClick={() => {window.location.href = '/api/auth/logout'}}> Log Out</div>
      </div>
    </div>
  )
}

export default ProfileChip