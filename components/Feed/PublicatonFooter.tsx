import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faComments } from '@fortawesome/free-solid-svg-icons';
import { montserrat } from '@/app/ui/fonts';
import { fetchNumberOfComments, fetchLikesCount } from '@/utils/fetchData';
import { submitLike } from '@/utils/submitData';
import PublicationComments from './PublicationComments';
import styles from './publicationFooter.module.css';

interface Props {
  authId: string,
  publication: any,
  token: string,
  onCommentAdded : () => any
}

/**
 * Component for the footer of a publication.
 * 
 * @param {string} authId - User ID.
 * @param {object} publication - The publication data.
 * @param {string} token - Authentication token for submitting likes and fetching comments.
 * @param {function} onCommentAdded - Function to call after updating comments.
 */
const PublicationFooter: React.FC<Props> = ({ authId, publication, token, onCommentAdded  }) => {
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      const commentCount = await fetchNumberOfComments(publication.id, token);
      const likeCount = await fetchLikesCount(publication.id, token);
      setCommentCount(commentCount);
      setLikeCount(likeCount);
    };

    fetchCounts();
  }, [publication.id, token]);


   /**
   * Parses the given date into a readable format.
   * 
   * @param {string} initialDate - The initial date string to parse.
   * @returns {string} - The parsed date string.
   */
  const parseDate = (initialDate: string): string => {
    const months = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const date = new Date(initialDate);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day.toString().padStart(2, '0')}, ${month} ${year}`;
}

   /**
   * Parses the given time into a readable format.
   * 
   * @param {string} initialTime - The initial time string to parse.
   * @returns {string} - The parsed time string.
   */
  const parseTime = (initialTime: string): string => {
    const date = new Date(initialTime);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

  /**
   * Handles the like action by submitting a like for the publication.
   */
  const handleLike = async () => {
    await submitLike(publication.id, authId, token);
    const newLikeCount = await fetchLikesCount(publication.id, token);
    setLikeCount(newLikeCount);
  };

  /**
   * Toggles the visibility of comments.
   */
  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  /**
   * Handles the update of comments.
   */
  const handleCommentUpdate = async () => {
    const newCommentCount = await fetchNumberOfComments(publication.id, token);
    setCommentCount(newCommentCount);
    onCommentAdded();
  };

  return (
    <footer>
      <section className={styles.counters}>
        <FontAwesomeIcon className={`${styles.footerIcon} ${styles.likeIcon}`} icon={faHeart} />
        Likes <span className={styles.counterSeparation}>{likeCount}</span>
        <FontAwesomeIcon className={`${styles.footerIcon} ${styles.commentsIcon}`} icon={faComments} />
        Comentarios {commentCount}
        <p className={styles.date}>{parseTime(publication.created_at)}, {parseDate(publication.created_at)}</p>
      </section>
      <section className={styles.buttonsContainer}>
        <button className={`${styles.btn} ${montserrat.className} antialised`} onClick={handleLike}>
          <FontAwesomeIcon className={styles.footerIcon} icon={faHeart} />
          Me gusta
        </button>
        <button className={`${styles.btn} ${montserrat.className} antialised`} onClick={toggleComments}>
          <FontAwesomeIcon className={styles.footerIcon} icon={faComment} />
          Comentarios
        </button>
      </section>
      <PublicationComments 
        publication={publication} 
        isCommentsVisible={isCommentsVisible} 
        userId={authId} 
        token={token} 
        onCommentUpdate={handleCommentUpdate}
      />
    </footer>
  );
};

export default PublicationFooter;
