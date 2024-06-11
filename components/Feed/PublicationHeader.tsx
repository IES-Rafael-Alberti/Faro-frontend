import Image from 'next/image'
import styles from './feedPublications.module.css'
import translateRol from '@/app/context/translate'
import { useEffect, useState } from 'react'
import { fetchBasicUserInfo } from '@/utils/fetchData'
import { width } from '@fortawesome/free-solid-svg-icons/fa0'

interface Props {
  publication: any,
  token: string
}

const PublicationHeader: React.FC<Props> = ({ publication, token }) => {
  const [userImg, setUserImg] = useState<string>('')

  useEffect(() => {
    fetchBasicUserInfo(publication.user_id, token)
      .then(data => {
        setUserImg(data.profile_picture)
      })
      .catch(error => console.error('Error fetching user image:', error))
  }, [userImg, publication.user_id, token])

  return (
    <header>
      <section className={styles.postInfo}>
        <Image src={userImg ? userImg : '/imgs/no-user-image.jpg'} className={styles.userImg} alt="user_image" width={75} height={75} />
        <div className={styles.userInfo}>
          <h2 className={`${styles.postName}`}>{publication.name}</h2>
          <p className={`${styles.postRol} ${styles.infoPost}`}>{translateRol(publication.user_role)}</p>
        </div>
      </section>
    </header>
  )
}

export default PublicationHeader