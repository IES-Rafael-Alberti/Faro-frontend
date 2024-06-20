import Image from 'next/image'
// import styles from './feedPublications.module.css'
import CommentForm from './CommentForm'
import styles from './publicationComments.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'
import { deleteComment } from '@/utils/deleteData'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '@/app/context/auth'

interface Props {
  publication: any
  isCommentsVisible: boolean
  userId: string
  token: string
  onCommentUpdate: () => any
}

/**
 * Component for displaying comments of a publication.
 * 
 * @param {object} publication - The publication data.
 * @param {boolean} isCommentsVisible - Boolean indicating whether comments are visible.
 * @param {string} userId - User ID.
 * @param {string} token - Authentication token for deleting comments.
 * @param {function} onCommentUpdate - Function to call after updating comments.
 */
const PublicationComments: React.FC<Props> = ({ publication, isCommentsVisible, userId, token, onCommentUpdate }) => {
  const { id } = useContext(AuthContext)

  /**
   * Function to delete a comment by ID.
   * 
   * @param {string} comment - The comment object.
   */
  const deleteCommentbyId = async (comment: any) => {
    try {
      await deleteComment(comment.id, comment.user_id, publication.id, token)
      onCommentUpdate()
      toast.success("Se ha eliminado el comentario correctamente.");

    } catch (error) {
      toast.error('Error: No se ha podido eliminar el comentario.')
    }
  }

  return (
    <section>
      {isCommentsVisible && (
        <>
          {publication.comments.map((comment : any, commentIndex : any) => (
            <div key={commentIndex} className={styles.comment}>
            {comment.user_id === userId &&
              <FontAwesomeIcon icon={faXmark} className={styles.deleteCommentIcon} onClick={() => deleteCommentbyId(comment)}/>
            }
              <Link href={id === comment.user_id ? `/private/profile` : `/private/profile/${comment.user_id}`}>
                <Image src={comment.image ? comment.image : '/imgs/no-user-image.jpg' } className={styles.userImg} alt="user_image" width={50} height={50} />
              </Link>
              <section className={styles.commentAndName}>
                <h4 className={styles.name}>{comment.name}</h4>
                <p className={styles.comment}>{comment.comment}</p>
              </section>
            </div>
          ))}
          <CommentForm publicationId={publication.id} userId={userId} token={token} onCommentUpdate={onCommentUpdate} />
          </>
      )}
    </section>
  )
}

export default PublicationComments