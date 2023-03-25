import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './RecoverySigners.module.scss'
import { useConfig } from '@/api/config'
import ChainChip from '@/components/Chips/ChainChip/ChainChip'
import BlurPaper from '@/layouts/Papers/BlurPaper/BlurPaper'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Plus from '@material-design-icons/svg/outlined/add.svg'

import Password from '@material-design-icons/svg/outlined/password.svg'
import Key from '@material-design-icons/svg/outlined/key.svg'
import { useState } from 'react'
import { FormControl, InputLabel } from '@mui/material'

interface RecoverySigner {
  name: string
  type: string
  value: string
}

interface RecoverySignersProps {
  recoverySigners: Array<RecoverySigner>
  setRecoverySigners: Function
}


const RecoverySigners: React.FC<RecoverySignersProps> = ({ recoverySigners, setRecoverySigners }) => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { chains } = useConfig()

  console.log(recoverySigners)

  const updateSigner = (index: number, id: string, value: string) => {
    const update: Array<RecoverySigner> = [...recoverySigners]
    //@ts-ignore
    update[index][id] = value
    setRecoverySigners(update)
  }

  const renderSigners = () => {
    return recoverySigners.map((s, index) => {
      // const [type, setType] = useState("email")
      return (
        <div key={index}>
          <TextField
            label="Name"
            id="filled-start-adornment"
            sx={{ m: 1, width: '40ch' }}
            variant="filled"
            value={s.name}
            onChange={(event) => updateSigner(index, "name", event.target.value)}
          />
          <FormControl variant="filled" sx={{ m: 1, width: '20ch' }}>
            <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={s.type}
              onChange={(event) => updateSigner(index, "type", event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"email"}>Email</MenuItem>
              <MenuItem value={"address"}>Address</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={s.type != "address" ? "Email" : "Address"}
            id="filled-start-adornment"
            sx={{ m: 1, width: '40ch' }}
            variant="filled"
            value={s.value}
            onChange={(event) => updateSigner(index, "value", event.target.value)}
          />

        </div>)
    })
  }


  return (
    <div className={styles['out__container']}>
      <div className={styles['title__container']}>
        Configure your Recovery Signers
      </div>
      <div className={styles['desc__container']}>
        Recovery Signers are individuals who can sign a multi signature transaction to reassign ownership of your smart wallet in the event of a compromised private key.
        We recommend between 3-6 recovery signers per account.
      </div>
      <div className={styles['note__container']}>
        NOTE: As a form of approval you can either select email or address for each signer.  If an address is picked the address will automatically be approved without any verification.  This is suggested for a wallet that you own.  If email is picked a unique verify link will be sent to the user and they will then sign a txn approving their address.
      </div>
      <div className={styles['signers__form']}>
        {renderSigners()}
        <div className={styles['add__signer']} onClick={() => setRecoverySigners([...recoverySigners, { name: "", type: "email", value: "" }])}>
          <Plus viewBox="0 0 24 24" /> Add Another Signer
        </div>
      </div>

    </div>
  )
}

export default RecoverySigners
