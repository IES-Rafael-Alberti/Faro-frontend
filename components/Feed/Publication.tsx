import styles from './feedPublications.module.css'
import PublicationHeader from './PublicationHeader'
import PublicationFooter from './PublicatonFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { deleteData } from '@/utils/deleteData'
import toast from 'react-hot-toast'

interface Props {
  id : string,
  publication: any,
  token: string,
  updatePublications : () => any,
  onCommentAdded : () => any
  handleUpdateFeed : () => any
}

/**
 * Component for displaying a single publication in the feed.
 * 
 * @param {string} id - User ID.
 * @param {object} publication - The publication data.
 * @param {string} token - Authentication token for deleting the publication.
 * @param {function} updatePublications - Function to call after updating the publications.
 * @param {function} onCommentAdded - Function to call after a comment is added.
 */
const Publication: React.FC<Props> = ({ id, publication, token, updatePublications, onCommentAdded, handleUpdateFeed }) => {

  /**
   * Function to parse multiline message and render as paragraphs.
   * 
   * @param {string} msg - The message string.
   * @returns {JSX.Element[]} - Array of JSX paragraphs.
   */
  const parseMsg = (msg: string) => {
    const lines = msg.split('\n');
    return lines.map((line, index) => <span key={index} className={styles.postMsg}>{line}</span>);
  }

  /**
   * Function to delete the publication.
   */
  const deletePublication = async () => {
    try {
      await deleteData(`publications/user/${id}/msg/${publication.id}`, token);
      updatePublications();
      handleUpdateFeed();
      toast.success("Se ha eliminado la publicación correctamente.");

    } catch (error) {
      toast.error('Error:  No se ha podido eliminar la publicación.');
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



