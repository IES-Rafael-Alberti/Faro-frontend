'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { fetchFeedData } from '@/utils/fetchData'
import { FeedPublicationInterface } from '@/types/FeedPublication.interface'
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {}

const FeedPublications: NextPage<Props> = () => {
  const [publications, setPublications] = useState<FeedPublicationInterface>({ data: [], currentPage: 0, totalPages: 0 })
  const [page, setPage] = useState(1)

  const fetchPublications = async (page: number) => {
    const result = await fetchFeedData(page, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzNTk2MjhhLTE0NTItNDU2My04NjZkLWNjM2Y3NmYwYTFlNyIsImVtYWlsIjoicG9sbGFAYWRtaW4uY29tIiwiaWF0IjoxNzE2ODg5MjA1LCJleHAiOjE3MTY4OTI4MDV9.oGZAhQMuui7zJwcB-smLh72xWklOl28aw_VbOko0ibk')
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
      <InfiniteScroll
        dataLength={publications.data.length}
        next={loadMore}
        hasMore={publications.currentPage < publications.totalPages}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {publications.data.map((publication, index) => (
          <div key={index}>
            <h2>{publication.msg}</h2>
            <p>Created at: {publication.created_at}</p>
            <p>User ID: {publication.user_id}</p>
            <p>Name: {publication.name}</p>
            <p>User Role: {publication.user_role}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default FeedPublications
