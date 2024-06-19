import Image from 'next/image'
import styles from './feedPublications.module.css'
import translateRol from '@/app/context/translate'
import { useContext, useEffect, useState } from 'react'
import { fetchBasicUserInfo } from '@/utils/fetchData'
import Link from 'next/link'
import { AuthContext } from '@/app/context/auth'

interface Props {
  publication: any,
  token: string
}
/**
 * Component for displaying the header of a publication.
 * 
 * @param {object} publication - The publication data.
 * @param {string} token - Authentication token for fetching user information.
 */
const PublicationHeader: React.FC<Props> = ({ publication, token }) => {
  const [userImg, setUserImg] = useState<string>('')
  const { id } = useContext(AuthContext)

  useEffect(() => {
    fetchBasicUserInfo(publication.user_id, token)
      .then(data => {
        setUserImg(data.profile_picture)
      })
      .catch(error => console.error('Error fetching user image:', error))
  }, [userImg, publication.user_id, token])

  useEffect(() => {
    console.log(id, publication.user_id)
  }, [])

  return (
    <header>
      <section className={styles.postInfo}>
      <Link href={id === publication.user_id ? `/private/profile` : `/private/profile/${publication.user_id}`}>
        <Image src={userImg ? userImg : '/imgs/no-user-image.jpg'} className={styles.userImg} alt="user_image" width={75} height={75} />
      </Link>
        <div className={styles.userInfo}>
          <Link href={id === publication.user_id ? `/private/profile` : `/private/profile/${publication.user_id}`}>
            <h2 className={`${styles.postName}`}>{publication.name}</h2>
          </Link>
          <p className={`${styles.postRol} ${styles.infoPost}`}>{translateRol(publication.user_role)}</p>
        </div>
      </section>
    </header>
  )
}

export default PublicationHeader