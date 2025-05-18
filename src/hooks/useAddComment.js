// hooks/useAddComment.js
import { useState } from 'react';
import { addComment } from '../services/api';

const useAddComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddComment = async (publicationId, comment) => {
    setLoading(true);
    setError(null);

    try {
      const commentData = {
        author: comment.author,
        content: comment.content,
      };

      const response = await addComment(publicationId, commentData);

      if (response?.error) {
        setError(response.error);
        return { error: response.error };
      }

      return { data: response };
    } catch (err) {
      setError(err.message || "Error desconocido");
      return { error: "Error al agregar el comentario" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleAddComment };
};

export default useAddComment;
