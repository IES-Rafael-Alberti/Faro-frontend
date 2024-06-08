"use client"
import { NextPage } from 'next'
import FeedPublications from '../../components/Feed/FeedPublications'
import BasicUserInfoCard from '@/components/Feed/BasicUserInfoCard'
import CreatePublication from '@/components/Feed/CreatePublication'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '@/app/context/auth'
import styles from './page.module.css'
import { fetchBasicUserInfo } from '@/utils/fetchData'
import { BasicUserInfoInterface } from '@/types/BasicUserInfo.interface'
import { HashLoader } from 'react-spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

interface Props {}

const Page: NextPage<Props> = () => {
  const { id, token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<BasicUserInfoInterface>({
    username: '',
    rol: '',
    count_of_publications: 0,
    count_of_connections: 0,
    profile_picture: ''
  })
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    fetchBasicUserInfo(id, token).then((response) => {
      setUser(response)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    })
  }, [id, token])

  return (
    <main className={isLoading ? `${styles.wrapper} ${styles.centerAll}` : styles.wrapper}>
      {isLoading && <HashLoader color="#163D64"/>}
      <aside className={styles.rightPart}>{!isLoading && <BasicUserInfoCard user={user} />}
      {!isLoading && <div className={styles.contactPart}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon}/>
        <p className={styles.contactInfo}>Para ponerse en contacto con el equipo de soporte haga click <Link href="mailto:faro@iesrafaelalberti.com">aquí</Link></p>
        </div>}
      </aside>
      {!isLoading && <CreatePublication userImg={user.profile_picture} setUpdate={setUpdate} />}
      {!isLoading && <FeedPublications token={token} />}

    </main>
  )
}

export default Page
