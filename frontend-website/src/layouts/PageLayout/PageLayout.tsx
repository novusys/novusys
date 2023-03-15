import React from 'react'
import styles from './PageLayout.module.scss'
import Head from 'next/head'
import MenuBar from '@/components/menu-bar/MenuBar'
import Sticky from 'react-stickynode'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import BackgroundLayout from '../BackgroundLayout/BackgroundLayout'
interface PageLayoutProps {
  children?: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
}) => {
  return (
    <BackgroundLayout>
      <Head>
        <title>novusys</title>
      </Head>
      
      <div className={styles['wrapper']}>
      <Header/>
        <div className={styles['page__content__container']}>
            {children}
            </div>
            <Footer/>
      </div>
      
    </BackgroundLayout>
  )
}

export default PageLayout