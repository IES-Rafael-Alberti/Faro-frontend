import Image from 'next/image'
import styles from './feedPublications.module.css'
import translateRol from '@/app/context/translate'

interface Props {
  publication: any
}

const PublicationHeader: React.FC<Props> = ({ publication }) => {

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

  return (
    <header>
      <div className={styles.postInfo}>
        <h2 className={`${styles.w50} ${styles.postName}`}>{publication.name}</h2>
        <p className={styles.infoPost}>{parseDate(publication.created_at)}</p>
        <p className={`${styles.w50}  ${styles.postRol} ${styles.infoPost}`}>{translateRol(publication.user_role)}</p>
        <p className={styles.infoPost}>{parseTime(publication.created_at)}</p>
      </div>
    </header>
  )
}

export default PublicationHeader