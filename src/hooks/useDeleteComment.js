// hooks/useDeleteComment.js
import { useState } from 'react';
import { deleteComment } from '../services/api';

const useDeleteComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteComment = async (commentId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await deleteComment(commentId);

      if (response?.error) {
        setError(response.msg || "Error al eliminar el comentario");
        return { error: response.msg };
      }

      return { success: true };
    } catch (err) {
      setError(err.message || "Error desconocido");
      return { error: "Error al eliminar el comentario" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleDeleteComment };
};

export default useDeleteComment;
