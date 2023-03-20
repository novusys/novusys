import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './ThemeToggle.module.scss'
import ButtonOutline from '../Buttons/ButtonOutline/ButtonOutline'
import DarkMode from '@material-design-icons/svg/outlined/dark_mode.svg'
import LightMode from '@material-design-icons/svg/outlined/light_mode.svg'
import { useEffect, useState } from 'react'
import {useTheme} from '../../api/theme-toggle'


const ThemeToggle: React.FC = () => {
  const {activeTheme, inactiveTheme, setActiveTheme} = useTheme()
  console.log(activeTheme, inactiveTheme)
  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);
  return (
    <>
      {
        activeTheme == "dark" ?
          <div className={styles['icon__container']} onClick={()=>{setActiveTheme("light")
          console.log("Test")}}>
            <LightMode viewBox="0 0 25 25"  style={{ fill: 'white' }}/>
            
          </div> : <div className={styles['icon__container']} onClick={()=>{setActiveTheme("dark")}}>
            <DarkMode viewBox="0 0 25 25" />
          </div>
      }
    </>
  )
}

export default ThemeToggle
