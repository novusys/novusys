import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './ProfileCreate.module.scss'
import ButtonOutline from '../../Buttons/ButtonOutline/ButtonOutline'
import { useConfig } from '@/api/config'
import ChainChip from '@/components/Chips/ChainChip/ChainChip'
import BlurPaper from '@/layouts/Papers/BlurPaper/BlurPaper'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { getEns } from '@/api/getEns'
import { NFTStorage, File, Blob } from 'nft.storage'

import TextField from '@mui/material/TextField';
import Edit from '@material-design-icons/svg/outlined/edit.svg'
import Close from '@material-design-icons/svg/outlined/close.svg'
import Key from '@material-design-icons/svg/outlined/key.svg'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'
import axios from 'axios'

interface Profile {
  display_name: string
  display_title: string
  display_desc: string
  ens: string
  discord: string
  twitter: string
  reddit: string
  medium: string
  instagram: string
  nft: string
}

interface ProfileCreateProps {
  profile: Profile
  setProfile: Function
}


const ProfileCreate: React.FC<ProfileCreateProps> = ({ profile, setProfile }) => {
  const { address, isConnected } = useAccount()
  const { user, error, isLoading } = useUser();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { chains } = useConfig()
  const { fetchEns } = getEns()

  const [edit, setEdit] = useState("")
  const [newImage, setNewImage] = useState("")
  // const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });
  const uploadFile = async (file: File) => {
    //setUploadingStatus("Uploading the file to AWS S3");
    // const certificationHash = await nftstorage.storeBlob(file);
    // console.log(certificationHash)
    // return certificationHash
  };


  const connectBtn = () => {
    if (isConnected) {
      return (
        <ButtonOutline text={address?.slice(0, 5) + "..." + address?.slice(30,)} onClick={() => { disconnect() }} />
      )
    } else {
      return (
        <ButtonOutline text="Connect Your Wallet" onClick={() => { connect() }} />
      )
    }
  }


  const onChangeFileUpload = async (file: File | null, setFunction: Function, name: string) => {
    if (!file) {
      setFunction('')
      return
    }

    //This might cause a memory leak
    var blob = file.slice(0, file.size, 'image/png');
    let fileToUpload = new File([blob], file.name, {
      type: file.type,
    });
    console.log("Test")
    const up = await uploadFile(file)
    console.log(up)

    setFunction("https://s3.us-west-2.amazonaws.com/novusys-pfps/" + fileToUpload.name)


  }

  const updateProfile = (field: keyof Profile, value: string) => {
    const update = { ...profile }
    update[field] = value
    setProfile(update)
  }

  if (error) {
    return (
      <>
        Auth0 Error: {error}
      </>
    )
  }

  if (isLoading) {
    return (<>
      Loading...
    </>)
  } else {
    if (profile.display_name == "") {
      //@ts-ignore
      updateProfile("display_name", user.given_name == undefined || user.family_name == undefined? user?.email : user.given_name + " " + user.family_name)
    }

  }


  return (
    <div className={styles['out__container']}>
      <div className={styles['title__container']}>
        Setup your Profile
      </div>
      <div className={styles['desc__container']}>
        *Please Note* All of this information will be publicly viewable and some stored on chain
      </div>
      <div className={styles['selector__container']}>
        <BlurPaper>
          <div className={styles['profile__container']}>
            <div className={styles['left__container']}>
              <div className={styles['pfp__container']}>

                <img src={user?.picture == null? './avatar.png': user?.picture} alt={"pfp"} className={styles['pfp']} />
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  className={styles['hide']}
                  onChange={async (event) =>
                    //@ts-ignore
                    await onChangeFileUpload(event.target.files[0] || null, setNewImage, "logo")
                  }
                />
                {
                  newImage === "" ?
                    <></> :
                    // <label htmlFor="contained-button-file">
                    //   <Edit viewBox="0 0 24 24" />
                    // </label> :
                    <div onClick={() => { setNewImage("") }}>
                      <Close viewBox="0 0 24 24" />
                    </div>
                }


              </div>
            </div>
            <div className={styles['right__container']}>
              <div className={styles['display__name']}>
                {
                  edit == "name" ? <TextField id="standard-basic" label="Display Name" variant="standard" value={profile.display_name} onChange={(event) => updateProfile('display_name', event.target.value)} onKeyDown={(event) => {
                    if (event.key == 'Enter') {
                      setEdit("")
                    }
                  }} onBlur={() => setEdit("")} /> : profile.display_name
                }
                <div onClick={() => setEdit("name")}>
                  <Edit viewBox="0 0 24 24" />
                </div>
              </div>
              <div className={styles['display__title']}>
                {
                  edit == "title" ? <TextField id="standard-basic" label="Display Title" variant="standard" value={profile.display_title} onChange={(event) => updateProfile('display_title', event.target.value)} onKeyDown={(event) => {
                    if (event.key == 'Enter') {
                      setEdit("")
                    }
                  }} onBlur={() => setEdit("")} /> :
                    profile.display_title === "" ?
                      "Profile Title" : profile.display_title

                }

                <div onClick={() => setEdit("title")}>
                  <Edit viewBox="0 0 24 24" />
                </div>

              </div>
              <div className={styles['display__desc']}>
                {
                  edit == "desc" ? <TextField id="standard-basic" label="Display Description" variant="standard" value={profile.display_desc} onChange={(event) => updateProfile('display_desc', event.target.value)} onKeyDown={(event) => {
                    if (event.key == 'Enter') {
                      setEdit("")
                    }
                  }} onBlur={() => setEdit("")} /> :
                    profile.display_title === "" ?
                      "Profile Description" : profile.display_desc
                }


                <div onClick={() => setEdit("desc")}>
                  <Edit viewBox="0 0 24 24" />
                </div>
              </div>
              <div className={styles['socials']}>
                {/* TODO: CHANGE to grab from ens table */}
                {
                  isConnected ?

                    <div className={styles['social__prof']}>
                      <img src='./logos/social/ens.png' className={styles['social__logo']} />
                      {profile.ens}
                    </div> : <></>}
                <div className={styles['social__prof']}>
                  <img src='./logos/social/discord.png' className={styles['social__logo']} />
                  {
                    edit == "discord" ? <TextField id="standard-basic" label="Discord" variant="standard" value={profile.discord} onChange={(event) => updateProfile('discord', event.target.value)} onKeyDown={(event) => {
                      if (event.key == 'Enter') {
                        setEdit("")
                      }
                    }} onBlur={() => setEdit("")} /> :
                      profile.discord === "" ?
                        "Discord" : profile.discord


                  }
                  <div onClick={() => setEdit("discord")}>
                    <Edit viewBox="0 0 24 24" />
                  </div>
                </div>
                <div className={styles['social__prof']}>
                  <img src='./logos/social/twitter.png' className={styles['social__logo']} />
                  {
                    edit == "twitter" ? <TextField id="standard-basic" label="Twitter" variant="standard" value={profile.twitter} onChange={(event) => updateProfile('twitter', event.target.value)} onKeyDown={(event) => {
                      if (event.key == 'Enter') {
                        setEdit("")
                      }
                    }} onBlur={() => setEdit("")} /> :
                      profile.twitter === "" ?
                        "Twitter" : profile.twitter

                  }
                  <div onClick={() => setEdit("twitter")}>
                    <Edit viewBox="0 0 24 24" />
                  </div>
                </div>
                <div className={styles['social__prof']}>
                  <img src='./logos/social/reddit.png' className={styles['social__logo']} />
                  {
                    edit == "reddit" ? <TextField id="standard-basic" label="Reddit" variant="standard" value={profile.reddit} onChange={(event) => updateProfile('reddit', event.target.value)} onKeyDown={(event) => {
                      if (event.key == 'Enter') {
                        setEdit("")
                      }
                    }} onBlur={() => setEdit("")} /> :
                      profile.reddit === "" ?
                        "Reddit" : profile.reddit


                  }
                  <div onClick={() => setEdit("reddit")}>
                    <Edit viewBox="0 0 24 24" />
                  </div>
                </div>
                <div className={styles['social__prof']}>
                  <img src='./logos/social/medium.png' className={styles['social__logo']} />
                  {
                    edit == "medium" ? <TextField id="standard-basic" label="Medium" variant="standard" value={profile.medium} onChange={(event) => updateProfile('medium', event.target.value)} onKeyDown={(event) => {
                      if (event.key == 'Enter') {
                        setEdit("")
                      }
                    }} onBlur={() => setEdit("")} /> :
                      profile.medium === "" ?
                        "Medium" : profile.medium

                  }
                  <div onClick={() => setEdit("medium")}>
                    <Edit viewBox="0 0 24 24" />
                  </div>
                </div>
                <div className={styles['social__prof']}>
                  <img src='./logos/social/instagram.webp' className={styles['social__logo']} />
                  {
                    edit == "instagram" ? <TextField id="standard-basic" label="Instagram" variant="standard" value={profile.instagram} onChange={(event) => updateProfile('instagram', event.target.value)} onKeyDown={(event) => {
                      if (event.key == 'Enter') {
                        setEdit("")
                      }
                    }} onBlur={() => setEdit("")} /> :
                      profile.instagram === "" ?
                        "Instagram" : profile.instagram

                  }
                  <div onClick={() => setEdit("instagram")}>
                    <Edit viewBox="0 0 24 24" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </BlurPaper>
      </div>
    </div>
  )
}

export default ProfileCreate
