import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './ChainSelect.module.scss'
import ButtonOutline from '../Buttons/ButtonOutline/ButtonOutline'
import { useConfig } from '@/api/config'
import ChainChip from '@/components/Chips/ChainChip/ChainChip'

interface ChainSelectProps {
  selectedChains: Array<string>
  setChains: Function
}


const ChainSelect: React.FC<ChainSelectProps> = ({ selectedChains, setChains }) => {

  const { chains } = useConfig()

  const renderChains = (mainnet: boolean) => {
    return Object.values(chains).map((c, index) => {
      if (mainnet == !c.test) {
        return (
          <ChainChip key ={index} name={c.chain} logo={c.logo} onClick={(add: boolean) => {
            if (add) {
              setChains([...selectedChains, c.id])
            } else {
              setChains(selectedChains.filter(function (e) { return e !== c.id }))

            }

          }} />
        )
      }
    })
  }

  return (
    <div className={styles['out__container']}>
      <div className={styles['title__container']}>
        Select your Chains
      </div>
      <div className={styles['network__title']}>
        Testnets
      </div>
      <div className={styles['testnet__container']}>

        {renderChains(false)}
      </div>
      <div className={styles['network__title']}>
        Mainnets
      </div>
      <div className={styles['mainnet__container']}>

        {renderChains(true)}

      </div>
    </div>
  )
}

export default ChainSelect
