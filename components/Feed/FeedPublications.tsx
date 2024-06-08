'use client'

import { NextPage } from 'next'
import { useEffect, useState, useContext } from 'react'
import { fetchCommentsOfPublication, fetchFeedData } from '../../utils/fetchData'
import { FeedPublicationInterface } from '../../types/FeedPublication.interface'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './feedPublications.module.css'
import { useRouter } from 'next/navigation'
import translateRol from '@/app/context/translate'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { montserrat } from '@/app/ui/fonts'
import { fetchBasicUserInfo } from '@/utils/fetchData'
import CommentForm from './CommentForm'
import PublicationHeader from './PublicationHeader'
import PublicationFooter from './PublicatonFooter'
import PublicationComments from './PublicationComments'

interface Props {
  token : string
  id: string
}

//  TO DO: FIX QUE NO EXPLOTE SI NO HAY DATA
const FeedPublications: NextPage<Props> = ({ token, id }) => {
  const [publications, setPublications] = useState<FeedPublicationInterface>({ data: [], currentPage: 0, totalPages: 0 })
  const [page, setPage] = useState(1)
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [isCommentsVisible, setIsCommentsVisible] = useState(false)
  // const [likesCount, setLikesCount] = useState(5)
  // const [commentsCount, setCommentsCount] = useState(3)

  const likesCount = 5
  const commentsCount = 5
  
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
  
  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  }

  const redirect = (path: string) => () => {
    router.push(path)
  }

  useEffect(() => {
    fetchPublications(page)
  }, [page, token])

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
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
      {publications.data.map((publication, index) => (
          <article key={index} className={styles.postContainer}>
            <PublicationHeader publication={publication} />
            <p className={styles.postMsg}>{publication.msg}</p>
            <PublicationFooter isLiked={isLiked} />
            <PublicationComments publication={publication} isCommentsVisible={isCommentsVisible} toggleComments={toggleComments} userId={id} token={token} />
          </article>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default FeedPublications
