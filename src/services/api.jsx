// api.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3010/Blog/v1",
  timeout: 5000,
});

// Obtener todas las publicaciones
export const getPublications = async () => {
  try {
    return await apiClient.get('/publications/');
  } catch (e) {
    console.error("Error al obtener publicaciones:", e);
    return { error: true, message: e.message || "Hubo un error al obtener las publicaciones." };
  }
};

// Agregar un comentario a una publicación
export const addComment = async (publicationId, data) => {
  try {
    // Construir el cuerpo con el ID de la publicación incluido
    const commentData = { ...data, publication: publicationId };

    // Mostrar en consola para verificar que los datos están completos
    console.log("Enviando comentario:", commentData);

    const response = await apiClient.post('/comments/', commentData);

    // Verificar si hay respuesta válida
    if (response.data) {
      return { success: true, data: response.data };
    }

    return { error: true, message: "No se recibieron datos válidos desde el servidor." };
  } catch (e) {
    console.error("Error al agregar comentario:", e);

    // Retornar un error más claro si lo hay en la respuesta
    return {
      error: true,
      message:
        e.response?.data?.message ||
        (e.response?.data?.errors ? e.response.data.errors.map(err => err.msg).join(" | ") : null) ||
        e.message ||
        "Hubo un error al agregar el comentario.",
    };
  }
};
