"use client"
import { NextPage } from 'next'
import FeedPublications from '../../components/Feed/FeedPublications'
import BasicUserInfoCard from '@/components/Feed/BasicUserInfoCard'
import CreatePublication from '@/components/Feed/CreatePublication'
import { useContext, useState } from 'react'
import { AuthContext } from '@/app/context/auth'
import styles from './page.module.css'
import { fetchBasicUserInfo } from '@/utils/fetchData'
import { BasicUserInfoInterface } from '@/types/BasicUserInfo.interface'
import { HashLoader } from 'react-spinners'

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

  fetchBasicUserInfo(id, token).then((response) => {
      setUser(response)
      setTimeout(() => {
      setIsLoading(false)}, 1000)
    }
  )

  return (
    <main className={isLoading ? `${styles.wrapper} ${styles.centerAll}` : styles.wrapper}>
      {isLoading && <HashLoader color="#163D64"/>}
      {!isLoading && <BasicUserInfoCard user={user} />}
      {!isLoading && <CreatePublication userImg={user.profile_picture} />}
      {!isLoading && <FeedPublications token={token} />}
    </main>
  )
}

export default Page
