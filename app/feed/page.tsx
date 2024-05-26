import { NextPage } from 'next'
import FeedPublications from '@/components/Feed/FeedPublications'
import BasicUserInfoCard from '@/components/Feed/BasicUserInfoCard'

interface Props {}

const Page: NextPage<Props> = () => {
  return (
    <div>
      <BasicUserInfoCard id='8359628a-1452-4563-866d-cc3f76f0a1e7' />
      <FeedPublications />
    </div>
  )
}

export default Page
