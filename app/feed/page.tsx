import { NextPage } from 'next'
import FeedPublications from '../../components/Feed/FeedPublications'
import BasicUserInfoCard from '@/components/Feed/BasicUserInfoCard'
import CreatePublication from '@/components/Feed/CreatePublication'

interface Props {}

// TODO: Update FeedPublications when createPublication submit a new publication
const Page: NextPage<Props> = () => {
  return (
    <div>
      <CreatePublication />
      <BasicUserInfoCard id='8359628a-1452-4563-866d-cc3f76f0a1e7' />
      <FeedPublications />
    </div>
  )
}

export default Page
