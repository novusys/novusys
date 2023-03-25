import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './SecurityFeatures.module.scss'
import { useConfig } from '@/api/config'
import ChainChip from '@/components/Chips/ChainChip/ChainChip'
import BlurPaper from '@/layouts/Papers/BlurPaper/BlurPaper'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import Password from '@material-design-icons/svg/outlined/password.svg'
import Key from '@material-design-icons/svg/outlined/key.svg'
import { InputAdornment, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { endianness } from 'os'
import { ethers } from 'ethers'

// {
//   balance_multisig: {
//     enabled: false,
//     value: 0,
//     address: ""
//   },
//   savings: {
//     enabled: false,
//     savings_percent: 30,
//     address: ""
//   }
// }

interface BalanceMultisig {
  enabled: boolean
  value: number
  address: string
}

interface Savings {
  enabled: boolean
  savings_percent: number
  address: string
}

interface Features {
  balance_multisig: BalanceMultisig
  savings: Savings
}

interface SecurityFeaturesProps {
  securityFeatures: Features
  setSecurityFeatures: Function
}


const SecurityFeatures: React.FC<SecurityFeaturesProps> = ({ securityFeatures, setSecurityFeatures }) => {

  console.log(securityFeatures)
  const updateFeatures = (feature: keyof Features, prop: keyof Savings | keyof BalanceMultisig, value: any) => {
    const update: Features = JSON.parse(JSON.stringify(securityFeatures))
    //@ts-ignore
    update[feature][prop] = value
    setSecurityFeatures(update)
  }

  return (
    <div className={styles['out__container']}>
      <div className={styles['title__container']}>
        Setup your Security Features
      </div>
      <div className={styles['desc__container']}>
        Configure your Smart Wallet permissions and safety barriers.
      </div>
      <div className={styles['feature__container']}>
        <div className={styles['attr__container']}>
          <div className={styles['inst__container']}>
            Require multisig for a transaction interacting with a large ammount of funds
          </div>
          <div className={styles['field__container']}>
            <ToggleButtonGroup
              color="primary"
              value={securityFeatures.balance_multisig.enabled}
              exclusive
              onChange={(event, newAlignment) => updateFeatures('balance_multisig', 'enabled', newAlignment)}
              aria-label="Platform"
            >
              <ToggleButton value={true}>Yes</ToggleButton>
              <ToggleButton value={false}>No</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        {
          securityFeatures.balance_multisig.enabled ?
            <>
              <div className={styles['attr__container']}>
                <div className={styles['inst__container']}>
                  Set transaction value limit
                </div>
                <div className={styles['field__container']}>
                  <TextField
                   error={securityFeatures.balance_multisig.value < 0 ? true : false}
                   helperText={securityFeatures.balance_multisig.value < 0 ? "Not a valid value" : ""}
                    type="number"
                    label="Amount"
                    id="filled-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    value={securityFeatures.balance_multisig.value}
                    onChange={(event) => updateFeatures('balance_multisig', 'value', event.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    variant="filled"
                  />
                </div>
              </div>
              <div className={styles['attr__container']}>
                <div className={styles['inst__container']}>
                  Add your secondary wallet
                </div>
                <div className={styles['field__container']}>
                  <TextField
                    error={!ethers.utils.isAddress(securityFeatures.balance_multisig.address)}
                    helperText={!ethers.utils.isAddress(securityFeatures.balance_multisig.address) ? "Not a Valid EVM Address" : ""}
                    label="Address"
                    id="filled-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    value={securityFeatures.balance_multisig.address}
                    onChange={(event) => updateFeatures('balance_multisig', 'address', event.target.value)}

                    variant="filled"
                  />
                </div>
              </div>
            </>

            : <></>
        }

      </div>

      <div className={styles['feature__container']}>
        <div className={styles['attr__container']}>
          <div className={styles['inst__container']}>
            Setup a Saving Account  *this will automaticlly send a set percentage of all incoming funds to the new wallet
          </div>
          <div className={styles['field__container']}>
            <ToggleButtonGroup
              color="secondary"
              value={securityFeatures.savings.enabled}
              exclusive
              onChange={(event, newAlignment) => updateFeatures('savings', 'enabled', newAlignment)}
              aria-label="Platform"
            >
              <ToggleButton value={true}>Yes</ToggleButton>
              <ToggleButton value={false}>No</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        {
          securityFeatures.savings.enabled ?
            <>
              <div className={styles['attr__container']}>
                <div className={styles['inst__container']}>
                  Percentage of incoming funds to be saved                </div>
                <div className={styles['field__container']}>
                  <TextField
                    error={securityFeatures.savings.savings_percent <= 0 || securityFeatures.savings.savings_percent > 100 ? true : false}
                    helperText={securityFeatures.savings.savings_percent <= 0 || securityFeatures.savings.savings_percent > 100 ? "Not a valid value" : ""}
                    type="number"
                    label="Amount"
                    id="filled-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    value={securityFeatures.savings.savings_percent}
                    onChange={(event) => updateFeatures('savings', 'savings_percent', event.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                    variant="filled"
                  />
                </div>
              </div>
              <div className={styles['attr__container']}>
                <div className={styles['inst__container']}>
                  Add your savings wallet                </div>
                <div className={styles['field__container']}>
                  <TextField
                    error={!ethers.utils.isAddress(securityFeatures.savings.address)}
                    helperText={!ethers.utils.isAddress(securityFeatures.savings.address) ? "Not a Valid EVM Address" : ""}
                    label="Address"
                    id="filled-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    value={securityFeatures.savings.address}
                    onChange={(event) => updateFeatures('savings', 'address', event.target.value)}

                    variant="filled"
                  />
                </div>
              </div>
            </>

            : <></>
        }
      </div>
    </div>
  )
}

export default SecurityFeatures
