'use client'

import { NextPage } from 'next'
import { BasicUserInfoInterface } from '@/types/BasicUserInfo.interface'
import Image from 'next/image'
import styles from './basicUserInfoCard.module.css'
import translateRol from '@/app/context/translate'

interface Props {
    user: BasicUserInfoInterface;
}

const BasicUserInfoCard: NextPage<Props> = ({ user }) => {

  return (
  <article className={styles.contentUserInfo}>
      {user.profile_picture && <Image className={styles.userImage} src={user.profile_picture} alt={`${user.username}_image`} width={100} height={100}/>}
      <h1 className={styles.infoHighlight}>{user.username}</h1>
      <p className={styles.info}>{translateRol(user.rol)}</p>
      <div className={styles.stadistics}>
          <p className={[styles.info, styles.flexInfo].join(' ')}>Publicaciones <span>{user.count_of_publications}</span></p>
          <p className={[styles.info, styles.flexInfo].join(' ')}>Contactos <span>{user.count_of_connections}</span></p>
      </div>
      <p className={`${styles.info} ${styles.littleText}`}>Proyecto Faro, I.E.S Rafael Alberti</p>
  </article>
  )
}

export default BasicUserInfoCard
