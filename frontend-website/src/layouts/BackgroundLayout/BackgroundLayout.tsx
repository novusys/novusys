import React from 'react'
import styles from './BackgroundLayout.module.scss'
import Head from 'next/head'
import MenuBar from '@/components/menu-bar/MenuBar'
import Sticky from 'react-stickynode'
import Header from '@/components/Header/Header'
interface PageLayoutProps {
  children?: React.ReactNode
}

const BackgroundLayout: React.FC<PageLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <div className={styles['background__container']}>

        <div className={styles['container']}>
          {children}
          <div className={styles['background__blur']}></div>
          <img src='./blobs/1.png' className={styles['blob__1']} />
          <img src='./blobs/2.png' className={styles['blob__2']} />
          <img src='./blobs/3.png' className={styles['blob__3']} />
          <img src='./blobs/4.png' className={styles['blob__4']} />
          <img src='./blobs/5.png' className={styles['blob__5']} />
        </div>
      </div>

    </>
  )
}

export default BackgroundLayout