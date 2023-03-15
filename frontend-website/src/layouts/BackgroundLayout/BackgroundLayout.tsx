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
      {children}
      </div>
      
    </>
  )
}

export default BackgroundLayout