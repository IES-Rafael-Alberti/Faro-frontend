import Image from 'next/image'
import styles from './feedPublications.module.css'
import CommentForm from './CommentForm'

interface Props {
  publication: any
  isCommentsVisible: boolean
  toggleComments: () => void
  userId: string
  token: string
}

const PublicationComments: React.FC<Props> = ({ publication, isCommentsVisible, toggleComments, userId, token }) => {
  return (
    <section>
      <button onClick={toggleComments}>
        {isCommentsVisible ? 'Hide Comments' : 'Show Comments'}
      </button>
      {isCommentsVisible && (
        <>
          {publication.comments.map((comment, commentIndex) => (
            <div key={commentIndex}>
              <Image src={comment.image ? comment.image : '/imgs/no-user-image.jpg' } className={styles.userImg} alt="user_image" width={75} height={75} />
              <h4>{comment.name}</h4>
              <p>{comment.comment}</p>
            </div>
          ))}
          <CommentForm publicationId={publication.id} userId={userId} token={token} />
        </>
      )}
    </section>
  )
}

export default PublicationComments