"use client"
import { NextPage } from 'next'
import FeedPublications from '../../components/Feed/FeedPublications'
import BasicUserInfoCard from '@/components/Feed/BasicUserInfoCard'
import CreatePublication from '@/components/Feed/CreatePublication'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth'
interface Props {}

 

const Page: NextPage<Props> = () => {

  const { id, token } = useContext(AuthContext)

  return (
    <div>
      <CreatePublication />
      <BasicUserInfoCard id={id} />
      <FeedPublications token={token} />
    </div>
  )
}

export default Page
