// api.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3010/Blog/v1",
  timeout: 5000,
});

apiClient.interceptors.request.use(

    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if (useUserDetails) {
            const token = JSON.parse(useUserDetails).token  
            config.headers['x-token'] = token;
            config.headers['x-token'] = token;
        }

        return config;
    },
    response => response,
    error => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new Event('token-expired'));
        }
        return Promise.reject(error);
    }
)

// Obtener todas las publicaciones
export const getPublications = async () => {
  try {
    const response = await apiClient.get('/publications/');
    return response.data; // <--- aquí extraemos solo data
  } catch (e) {
    console.error("Error al obtener publicaciones:", e);
    return { error: true, message: e.message || "Hubo un error al obtener las publicaciones." };
  }
};


// Agregar un comentario a una publicación
export const addComment = async (data) => {
  try {
    return await apiClient.post('/comments/', data);
  } catch (e) {
    const msg = e.response?.data?.msg || 'Error desconocido';
    return {
      error: true,
      msg,
      e,
    };
  }
};

export const deleteComment = async (commentId) => {
   try {
        return await apiClient.delete(`/comments/${commentId}`)
  } catch (e) {
      const msg = e.response?.data?.msg || 'Error desconocido';
      return {
          error: true,
          msg,
          e,
      };
  }
}

export const updateComment = async ( commentId,data ) => {
  try{
    return await apiClient.put(`/comments/${commentId}`,data)
  }catch(e){
    const msg = e.response?.data?.msg || 'Error desconocido';
    return {
        error: true,
        msg,
        e,
    };  
  }
}