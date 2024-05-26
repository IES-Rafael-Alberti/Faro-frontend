import { NextPage } from 'next'
import FeedPublications from '../../components/Feed/FeedPublications'

interface Props {}

const Page: NextPage<Props> = () => {
  return (
    <div>
      <FeedPublications />
    </div>
  )
}

export default Page
