import { useState } from "react";
import toast from "react-hot-toast";
import {
    addComment as addCommentRequest,
    deleteComment as deleteCommentRequest,
    updateComment as updateCommentRequest
} from "../services/api";

export const useComment = () => {
    const [comments, setComments] = useState([]);

    const addComment = async (commentData) => {
    const result = await addCommentRequest(commentData);

    if (result?.error) {
        return toast.error(result.msg || "No se pudo agregar el comentario");
    }

    toast.success("Comentario agregado con éxito");

    // Aquí accede a result.data.newComment, que es el comentario creado en backend
    setComments((prev) => [...prev, result.data.newComment]);

    return result.data.newComment;
    };

    const deleteComment = async (publicationId, commentId) => {
        const result = await deleteCommentRequest(commentId);

        if (result?.error) {
            toast.error(result.msg || "No se pudo eliminar el comentario");
            return false;
        }

        toast.success("Comentario eliminado correctamente");
        setComments((prev) => prev.filter(comment => comment._id !== commentId && comment.uid !== commentId));
        return true;
    };

    const updateComment = async (id, updatedComment) => {
        const result = await updateCommentRequest(id, updatedComment);

        if (result.error) {
            return toast.error(result.e?.response?.data?.msg || "No se pudo actualizar el comentario");
        }

        toast.success("Comentario actualizado correctamente");
        setComments((prev) => prev.map(c => (c._id === id || c.uid === id ? result.comment || result.data.comment : c)));
        return result.comment || result.data.comment; 
    };

    return {
        comments,
        setComments,
        addComment,
        deleteComment,
        updateComment
    };
};
