import Image from 'next/image'
// import styles from './feedPublications.module.css'
import CommentForm from './CommentForm'
import styles from './publicationComments.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import { deleteComment } from '@/utils/deleteData'

interface Props {
  publication: any
  isCommentsVisible: boolean
  userId: string
  token: string
  onCommentUpdate: () => any
}

const PublicationComments: React.FC<Props> = ({ publication, isCommentsVisible, userId, token, onCommentUpdate  }) => {

  const deleteCommentbyId = async (comment : string) => {
    try {
      // const response = await deleteComment(`comments/${comment.id}/user/${userId}/publication/${publication.id}`, token)
      onCommentUpdate()
    } catch (error) {
      console.error('Error deleting publication:', error)
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
              <Image src={comment.image ? comment.image : '/imgs/no-user-image.jpg' } className={styles.userImg} alt="user_image" width={50} height={50} />
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