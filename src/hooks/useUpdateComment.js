// hooks/useUpdateComment.js
import { useState } from 'react';
import { updateComment } from '../services/api';

const useUpdateComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateComment = async (commentId, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateComment(commentId, updatedData);

      if (response?.error) {
        setError(response.msg || "Error al actualizar el comentario");
        return { error: response.msg };
      }

      return { data: response.data || response };
    } catch (err) {
      setError(err.message || "Error desconocido");
      return { error: "Error al actualizar el comentario" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleUpdateComment };
};

export default useUpdateComment;
