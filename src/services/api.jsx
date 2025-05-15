import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3010/Blog/v1",
  timeout: 5000,
});

export const getPublications = async (data) => {
  try {
    return await apiClient.get('/publications/', data)
  } catch (e) {
    return {
      error: true,
      e
    }
  }
}