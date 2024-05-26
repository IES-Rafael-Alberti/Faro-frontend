import { NextPage } from 'next'
import { fetchFeedData } from '@/utils/fetchData'

interface Props {}

const FeedPublications: NextPage<Props> = async () => {
  const result = await fetchFeedData('http://localhost:3000/publications', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzNTk2MjhhLTE0NTItNDU2My04NjZkLWNjM2Y3NmYwYTFlNyIsImVtYWlsIjoicG9sbGFAYWRtaW4uY29tIiwiaWF0IjoxNzE2NzQ0NDA1LCJleHAiOjE3MTY3NDgwMDV9.7a7RSq5K0oy3nNJ1OVKGxSYQ9q_BKYhFu6DTeBzq_cc')
  const publications = result?.data || []
  return (
    <div>
      {publications.length > 0
        ? (
            publications.map((publication) => (
              <div key={publication.id}>
                <h2>{publication.msg}</h2>
                <p>Created at: {publication.created_at}</p>
                <p>User ID: {publication.user_id}</p>
                <p>Name: {publication.name}</p>
                <p>User Role: {publication.user_role}</p>
              </div>
            ))
          )
        : (
            <p>No publications available.</p>
          )
      }
    </div>
  )
}

export default FeedPublications
