'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { fetchCommentsOfPublication, fetchFeedData } from '../../utils/fetchData'
import { FeedPublicationInterface } from '../../types/FeedPublication.interface'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './feedPublications.module.css'
import { fetchBasicUserInfo } from '@/utils/fetchData'
import Publication from './Publication'
import { on } from 'events'
import { faSleigh } from '@fortawesome/free-solid-svg-icons'
import { useCallback } from 'react'

interface Props {
  token : string
  id: string
  updateFeed: boolean
}

/**
 * Component for displaying feed publications.
 *
 * @param {string} token - Authentication token for fetching data.
 * @param {string} id - User ID.
 * @param {boolean} updateFeed - Boolean indicating whether to update the feed.
 */
  const FeedPublications: NextPage<Props> = ({ token, id, updateFeed }) => {
  const [publications, setPublications] = useState<FeedPublicationInterface>({ data: [], currentPage: 0, totalPages: 0 })
  const [page, setPage] = useState(1)
  const [commentAdded, setCommentAdded] = useState(false)
  const [updatePublications, setUpdatePublications] = useState(false)

  const fetchPublications = useCallback(async (page: number) => {
    // This line prevents to fetch data when you logout after load this component
    if (!token) {
      return
    }
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
  }, [token]);

  const setUpdate = useCallback(() => {
    setUpdatePublications(true)
  }, []);

  const onCommentAdded = useCallback(() => {
    setCommentAdded(true)
  }, []);

  useEffect(() => {
    fetchPublications(page)
    setCommentAdded(false)
    setUpdatePublications(false)
  }, [updateFeed, updatePublications, page, token, commentAdded, fetchPublications])


    /**
   * Function to load more publications when scrolling.
   */
  const loadMore = () => {
    if (publications.currentPage < publications.totalPages) {
      setPage(prevPage => prevPage + 1)
    }
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
