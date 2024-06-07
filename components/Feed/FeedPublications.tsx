'use client'

import { NextPage } from 'next'
import { useEffect, useState, useContext } from 'react'
import { fetchFeedData } from '../../utils/fetchData'
import { FeedPublicationInterface } from '../../types/FeedPublication.interface'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from './feedPublications.module.css'
import { useRouter } from 'next/navigation'
import translateRol from '@/app/context/translate'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import { montserrat } from '@/app/ui/fonts'

interface Props {
  token : string
}

//  TO DO: FIX QUE NO EXPLOTE SI NO HAY DATA
const FeedPublications: NextPage<Props> = ({ token }) => {
  const [publications, setPublications] = useState<FeedPublicationInterface>({ data: [], currentPage: 0, totalPages: 0 })
  const [page, setPage] = useState(1)
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  // const [likesCount, setLikesCount] = useState(5)
  // const [commentsCount, setCommentsCount] = useState(3)

  const likesCount = 5
  const commentsCount = 5
  
  const fetchPublications = async (page: number) => {
    console.log(token)
    const result = await fetchFeedData(page, token)
    console.log(result)
    setPublications(prevPublications => ({ ...result, data: [...prevPublications.data, ...result.data] }))
  }

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

  const parseTime = (initialTime: string): string => {
    const date = new Date(initialTime);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
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
            <header>
              <Image src={publication.profile_picture ? publication.profile_picture : '/imgs/no-user-image.jpg' } className={styles.userImg} alt="user_image" width={75} height={75} />
              {/* <h2 onClick={redirect(`/profile/${publication.user_id}`)}>{publication.name}</h2> */}
              <div className={styles.postInfo}>
                <h2 className={`${styles.w50} ${styles.postName}`}>{publication.name}</h2>
                <p className={styles.infoPost}>{parseDate(publication.created_at)}</p>
                <p className={`${styles.w50}  ${styles.postRol} ${styles.infoPost}`}>{translateRol(publication.user_role)}</p>
                <p className={styles.infoPost}>{parseTime(publication.created_at)}</p>
              </div>
            </header>
            <p className={styles.postMsg}>{publication.msg}</p>

            {(likesCount > 0 || commentsCount > 0) && (
              <section className={styles.postStadistics}>
                {likesCount > 0 && (
                  <p className={`${styles.stadistic} ${styles.likes}`}>
                    <FontAwesomeIcon className={styles.likeIcon} icon={faHeart} />
                    {likesCount} Me gusta
                  </p>)
                }
                {commentsCount > 0 && (
                  <p className={`${styles.stadistic} ${styles.comments}`}>
                    <FontAwesomeIcon className={styles.commentsIcon} icon={faComments} />
                    {commentsCount} Comentario/s
                  </p>)
                }
              </section>
            )}

            <footer>
              <button className={`${styles.btn} ${montserrat.className} antialised`}>
                <FontAwesomeIcon className={isLiked ? `${styles.footerIcon} ${styles.isLiked}` : styles.footerIcon} icon={faHeart} />
                Me gusta
              </button>
              <button className={`${styles.btn} ${montserrat.className} antialised`}>
                <FontAwesomeIcon className={styles.footerIcon} icon={faComment} />
                Comentar
              </button>
            </footer>

          </article>
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default FeedPublications
