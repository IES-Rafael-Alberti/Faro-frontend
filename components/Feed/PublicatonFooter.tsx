import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import styles from './feedPublications.module.css'
import { montserrat } from '@/app/ui/fonts'

interface Props {
  isLiked: boolean
}

const PublicationFooter: React.FC<Props> = ({ isLiked }) => {
  return (
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
  )
}

export default PublicationFooter