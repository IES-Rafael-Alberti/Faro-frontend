'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { fetchCommentsOfPublication, fetchFeedData } from '../../utils/fetchData'
import { FeedPublicationInterface } from '../../types/FeedPublication.interface'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './feedPublications.module.css'
import { useRouter } from 'next/navigation'
import { fetchBasicUserInfo } from '@/utils/fetchData'
import Publication from './Publication'
import { on } from 'events'
import { faSleigh } from '@fortawesome/free-solid-svg-icons'

interface Props {
  token : string
  id: string
  updateFeed: boolean
}

//  TO DO: FIX QUE NO EXPLOTE SI NO HAY DATA
const FeedPublications: NextPage<Props> = ({ token, id, updateFeed }) => {
  const [publications, setPublications] = useState<FeedPublicationInterface>({ data: [], currentPage: 0, totalPages: 0 })
  const [page, setPage] = useState(1)
  const router = useRouter()
  const [commentAdded, setCommentAdded] = useState(false)
  const [updatePublications, setUpdatePublications] = useState(false)

  const fetchPublications = async (page: number) => {
    const publicationsApiCall = await fetchFeedData(page, token);
    
    const publicationsWithComments = await Promise.all(publicationsApiCall.data.map(async (publication) => {
      const comments = await fetchCommentsOfPublication(publication.id, token);
      
      const commentsWithUserInfo = await Promise.all(comments.map(async (comment) => {
        const user = await fetchBasicUserInfo(comment.user_id, token);
        return {
          ...comment,
          name: user.username,
          role: user.rol,
          image: user.profile_picture,
        };
      }));
      
      return {
        ...publication,
        comments: commentsWithUserInfo,
      };
    }));
    setPublications({ ...publicationsApiCall, data: publicationsWithComments });
  };

  const redirect = (path: string) => () => {
    router.push(path)
  }

  const setUpdate = () => {
    setUpdatePublications(true)
  }

  useEffect(() => {
    fetchPublications(page)
    setCommentAdded(false)
    setUpdatePublications(false)
  }, [updateFeed, updatePublications, page, token, commentAdded])

  const loadMore = () => {
    if (publications.currentPage < publications.totalPages) {
      setPage(prevPage => prevPage + 1)
    }
  }

  const onCommentAdded = () => {
    setCommentAdded(true)
  }

  return (
    <div>
      <InfiniteScroll
        className={styles.scrollContainer}
        dataLength={publications.data.length}
        next={loadMore}
        hasMore={publications.currentPage < publications.totalPages}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center', color: 'var(--primary)', fontStyle: 'italic'  }}>
            <b>No hay más publicaciones.</b>
          </p>
        }
      >
      {publications.data.map((publication, index) => (
          <Publication key={index} id={id} token={token} publication={publication} updatePublications={setUpdate} onCommentAdded={onCommentAdded}/>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default FeedPublications
