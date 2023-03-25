import React from 'react'
import styles from './BlurPaper.module.scss'
import Head from 'next/head'
interface PageLayoutProps {
  children?: React.ReactNode
}

const BlurPaper: React.FC<PageLayoutProps> = ({
  children,
}) => {
  return (
    <div className={styles['out__container']}>
      {children}
    </div>

  )
}

export default BlurPaper