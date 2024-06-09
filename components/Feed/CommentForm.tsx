import React, { useState } from 'react';
import { submitPublicationComment } from '@/utils/submitData';
import styles from './commentForm.module.css';

const CommentForm: React.FC<{ publicationId: string, userId: string, token: string, onCommentUpdate: () => any }> = ({ publicationId, userId, token, onCommentUpdate }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (comment.trim() !== '') {
      await submitPublicationComment(publicationId, userId, comment, token);
      onCommentUpdate();
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Escribe un comentario..."
        className={styles.commentInput}
      />
      <button type="submit" className={styles.commentButton}>Comentar</button>
    </form>
  );
};

export default CommentForm;