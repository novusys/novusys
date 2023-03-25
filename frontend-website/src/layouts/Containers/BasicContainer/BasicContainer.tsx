import React from 'react'
import styles from './BasicContainer.module.scss'

interface PageLayoutProps {
  children?: React.ReactNode
}

const BasicContainer: React.FC<PageLayoutProps> = ({
  children,
}) => {
  return (
    <div className={styles['out__container']}>
      {children}
    </div>

  )
}

export default BasicContainer