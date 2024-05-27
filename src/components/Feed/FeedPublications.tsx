'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { fetchFeedData } from '@/utils/fetchData'
import { FeedPublicationInterface } from '@/types/FeedPublication.interface'

interface Props {}

const FeedPublications: NextPage<Props> = () => {
  const [publications, setPublications] = useState<FeedPublicationInterface>({ data: [], currentPage: 0, totalPages: 0 })

  const fetchPublications = async () => {
    const result = await fetchFeedData('http://localhost:3000/publications', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzNTk2MjhhLTE0NTItNDU2My04NjZkLWNjM2Y3NmYwYTFlNyIsImVtYWlsIjoicG9sbGFAYWRtaW4uY29tIiwiaWF0IjoxNzE2ODA3MTkwLCJleHAiOjE3MTY4MTA3OTB9.P2HQLH_anb_7Wcna71agFANRZ89eEHNa5BGQwKQtTXw')
    setPublications(result)
  }

  useEffect(() => {
    fetchPublications()
  }, [])

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
    </div>
  )
}

export default FeedPublications
