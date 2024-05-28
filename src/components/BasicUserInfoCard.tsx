import { NextPage } from 'next'
import { fetchBasicUserInfo } from '@/utils/fetchData'

interface Props {
    id: string;
}

const BasicUserInfoCard: NextPage<Props> = async ({ id }) => {
  const user = await fetchBasicUserInfo(id, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzNTk2MjhhLTE0NTItNDU2My04NjZkLWNjM2Y3NmYwYTFlNyIsImVtYWlsIjoicG9sbGFAYWRtaW4uY29tIiwiaWF0IjoxNzE2ODg5MjA1LCJleHAiOjE3MTY4OTI4MDV9.oGZAhQMuui7zJwcB-smLh72xWklOl28aw_VbOko0ibk')

  return <div>
    <h1>{user.username}</h1>
    <p>{user.profile_picture}</p>
    <p>{user.rol}</p>
    <p>{user.count_of_publications}</p>
    <p>{user.count_of_connections}</p>
  </div>
}

export default BasicUserInfoCard
