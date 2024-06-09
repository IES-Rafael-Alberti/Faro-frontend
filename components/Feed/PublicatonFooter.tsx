import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import styles from './feedPublications.module.css'
import { montserrat } from '@/app/ui/fonts'
import { fetchNumberOfComments, fetchLikesCount } from '@/utils/fetchData'

interface Props {
  isLiked: boolean
  id: string
  token: string
}

const PublicationFooter: React.FC<Props> = ({ isLiked, id, token }) => {
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    fetchNumberOfComments(id, token).then((response) => {
      setCommentCount(response)
    })

    fetchLikesCount(id, token).then((response) => {
      setLikeCount(response)
    })
  }, []);

  return (
    <footer>
      Comentarios {commentCount}
      Likes {likeCount}
      <button className={`${styles.btn} ${montserrat.className} antialised`}>
        <FontAwesomeIcon className={isLiked ? `${styles.footerIcon} ${styles.isLiked}` : styles.footerIcon} icon={faHeart} />
        Me gusta {likeCount}
      </button>
      <button className={`${styles.btn} ${montserrat.className} antialised`}>
        <FontAwesomeIcon className={styles.footerIcon} icon={faComment} />
      </button>
    </footer>
  )
}

export default PublicationFooter