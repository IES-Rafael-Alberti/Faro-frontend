import { NextPage } from 'next'
import { fetchFeedData } from '@/utils/fetchData'

interface Props {}

const FeedPublications: NextPage<Props> = async () => {
  const result = await fetchFeedData('http://localhost:3000/publications', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzNTk2MjhhLTE0NTItNDU2My04NjZkLWNjM2Y3NmYwYTFlNyIsImVtYWlsIjoicG9sbGFAYWRtaW4uY29tIiwiaWF0IjoxNzE2NzM2MjM0LCJleHAiOjE3MTY3Mzk4MzR9.oT8BzvhZl_eu49NVI0_Tp8sKeIGkKik1SdCoK84DwRE')
  const publications = result.data
  return (
    <div>
      {publications && publications.map((publication) => (
        <div key={publication.id}>
          <h2>{publication.msg}</h2>
          <p>Created at: {publication.created_at}</p>
          <p>User ID: {publication.user_id}</p>
        </div>
      ))}
    </div>
  )
}

export default FeedPublications
