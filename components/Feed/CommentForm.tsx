import React, { useState } from 'react';
import { submitPublicationComment } from '@/utils/submitData';

const CommentForm: React.FC<{ publicationId: string, userId: string, token: string }> = ({ publicationId, userId, token }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (comment.trim() !== '') {
      await submitPublicationComment(publicationId, userId, comment, token);
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
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;