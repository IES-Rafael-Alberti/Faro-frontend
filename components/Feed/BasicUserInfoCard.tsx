'use client'

import { NextPage } from 'next'
import { fetchBasicUserInfo } from '@/utils/fetchData'
import { AuthContext } from '@/context/auth'
import { useContext } from 'react'

interface Props {
    id: string;
}

const BasicUserInfoCard: NextPage<Props> = async ({ id }) => {
  const { token } = useContext(AuthContext)
  const user = await fetchBasicUserInfo(id, token)

  return <div>
    <h1>{user.username}</h1>
    <p>{user.profile_picture}</p>
    <p>{user.rol}</p>
    <p>{user.count_of_publications}</p>
    <p>{user.count_of_connections}</p>
  </div>
}

export default BasicUserInfoCard
