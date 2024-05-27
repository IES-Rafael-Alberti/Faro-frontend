'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { fetchFeedData } from '@/utils/fetchData'
import { FeedPublicationInterface } from '@/types/FeedPublication.interface'

interface Props {}

const FeedPublications: NextPage<Props> = () => {
  const [publications, setPublications] = useState<FeedPublicationInterface>({ data: [], currentPage: 0, totalPages: 0 })
  const [page, setPage] = useState(1)

  const fetchPublications = async (page: number) => {
    const result = await fetchFeedData(`http://localhost:3000/publications/${page}`, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzNTk2MjhhLTE0NTItNDU2My04NjZkLWNjM2Y3NmYwYTFlNyIsImVtYWlsIjoicG9sbGFAYWRtaW4uY29tIiwiaWF0IjoxNzE2ODA5OTk2LCJleHAiOjE3MTY4MTM1OTZ9.Xg3wWUj4gEdKHArbUauY9b21LOWYO2GKVDdx34zuJJ0')
    setPublications(prevPublications => ({ ...result, data: [...prevPublications.data, ...result.data] }))
  }

  useEffect(() => {
    fetchPublications(page)
  }, [page])

  const loadMore = () => {
    if (publications.currentPage < publications.totalPages) {
      setPage(prevPage => prevPage + 1)
    }
  }

  return (
    <div>
      {publications.data.length > 0
        ? (
            publications.data.map((publication, index) => (
              <div key={index}>
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
      {publications.currentPage < publications.totalPages && <button onClick={loadMore}>Load more</button>}
    </div>
  )
}

export default FeedPublications
