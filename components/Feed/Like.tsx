import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { montserrat } from '@/app/ui/fonts';
import styles from './publicationFooter.module.css';

interface LikeButtonProps {
  onLike: () => void;
  onDislike: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ onLike, onDislike }) => {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
    if (liked) {
      onDislike();
      return;
    }
    onLike();
  };

  return (
    <button 
      className={`${styles.btn} ${montserrat.className} antialised`} 
      onClick={handleClick}
    >
      {/* <FontAwesomeIcon className={liked ? `${styles.footerIcon} ${styles.isLiked}` : styles.footerIcon} icon={faHeart} /> */}
      <FontAwesomeIcon className={styles.footerIcon} icon={faHeart} />
      {liked ? 'Quitar me  gusta' : 'Me gusta'}
    </button>
  );
};

export default LikeButton;