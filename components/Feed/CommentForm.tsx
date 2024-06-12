import React, { useState } from 'react';
import { submitPublicationComment } from '@/utils/submitData';
import styles from './commentForm.module.css';

/**
 * Component for submitting comments on a publication.
 * 
 * @param {string} publicationId - The ID of the publication to comment on.
 * @param {string} userId - The ID of the user submitting the comment.
 * @param {string} token - Authentication token for submitting the comment.
 * @param {function} onCommentUpdate - Function to call after submitting a comment.
 */
const CommentForm: React.FC<{ publicationId: string, userId: string, token: string, onCommentUpdate: () => any }> = ({ publicationId, userId, token, onCommentUpdate }) => {
  const [comment, setComment] = useState('');

  /**
   * Function to handle form submission.
   * 
   * @param {React.FormEvent} event - The form submission event.
   */
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
        placeholder="Write a comment..."
        className={styles.commentInput}
      />
      <button type="submit" className={styles.commentButton}>Comment</button>
    </form>
  );
};

export default CommentForm;
