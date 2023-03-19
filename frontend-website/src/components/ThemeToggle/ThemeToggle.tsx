import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './ThemeToggle.module.scss'
import ButtonOutline from '../Buttons/ButtonOutline/ButtonOutline'
import DarkMode from '@material-design-icons/svg/outlined/dark_mode.svg'
import LightMode from '@material-design-icons/svg/outlined/light_mode.svg'
import { useEffect, useState } from 'react'


const ThemeToggle: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState("light");
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";
  useEffect(() => {
    document.body.dataset.theme = activeTheme;
  }, [activeTheme]);
  return (
    <>

      {
        activeTheme == "dark" ?
          <div className={styles['icon__container']} onClick={()=>{setActiveTheme("light")
          console.log("Test")}}>
            <DarkMode viewBox="0 0 25 25" />
          </div> : <div className={styles['icon__container']} onClick={()=>{setActiveTheme("dark")}}>
            <LightMode viewBox="0 0 25 25" />
          </div>
      }

    </>
  )
}

export default ThemeToggle
