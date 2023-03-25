import React from 'react'
import styles from './BluredContainer.module.scss'
import Head from 'next/head'
interface PageLayoutProps {
  children?: React.ReactNode
}

const BluredContainer: React.FC<PageLayoutProps> = ({
  children,
}) => {
  return (
    <div className={styles['out__container']}>
      {children}
    </div>

  )
}

export default BluredContainer