import styles from './feedPublications.module.css'
import PublicationHeader from './PublicationHeader'
import PublicationFooter from './PublicatonFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { deleteData } from '@/utils/deleteData'
import { useEffect } from 'react'

interface Props {
  id : string,
  publication: any,
  token: string,
  updatePublications : () => any,
  onCommentAdded : () => any
}

const Publication: React.FC<Props> = ({ id, publication, token, updatePublications, onCommentAdded }) => {

  const parseMsg = (msg : string) => {
    const lines = msg.split('\n');
    return lines.map((line, index) => <p key={index} className={styles.postMsg}>{line}</p>);
  }

  const deletePublication = async () => {
    try {
      const response = await deleteData(`publications/user/${id}/msg/${publication.id}`, token)
      updatePublications()
    } catch (error) {
      console.error('Error deleting publication:', error)
    }
  }

  return (
    <>
        <article className={styles.postContainer}>
        {publication.user_id === id &&
          <FontAwesomeIcon icon={faXmark} className={styles.deletePostIcon} onClick={deletePublication}/>
        }
        <PublicationHeader publication={publication} token={token} />
        <p className={styles.postMsg}>{parseMsg(publication.msg)}</p>
        <PublicationFooter authId={id} token={token} publication={publication} onCommentAdded={onCommentAdded} />
        </article>
    </>
  )
}

export default Publication



