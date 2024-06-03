'use client'

import { NextPage } from 'next'
import { useEffect, useState, useContext } from 'react'
import { fetchFeedData } from '../../utils/fetchData'
import { FeedPublicationInterface } from '../../types/FeedPublication.interface'
import InfiniteScroll from 'react-infinite-scroll-component'
import { AuthContext } from '../../app/context/auth'

interface Props {}

//  TO DO: FIX QUE NO EXPLOTE SI NO HAY DATA
const FeedPublications: NextPage<Props> = () => {
  const { token } = useContext(AuthContext)

  const [publications, setPublications] = useState<FeedPublicationInterface>({ data: [], currentPage: 0, totalPages: 0 })
  const [page, setPage] = useState(1)

  const fetchPublications = async (page: number) => {
    const result = await fetchFeedData(page, token)
    console.log(result)
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
