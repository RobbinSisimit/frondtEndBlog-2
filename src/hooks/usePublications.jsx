import { useState, useEffect } from "react";
import { getPublications } from "../services/api";

const usePublications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para actualizar un comentario en una publicación
  const updatePublicationComments = (publicationId, newComment) => {
    setPublications((prevPublications) =>
      prevPublications.map((pub) =>
        pub._id === publicationId
          ? { ...pub, comments: [...pub.comments, newComment] } // Agrega el nuevo comentario
          : pub
      )
    );
  };

  useEffect(() => {
    const fetchPublications = async () => {
      const response = await getPublications();
      if (!response.error) {
        setPublications(response.data.publications);
      }
      setLoading(false);
    };

    fetchPublications();
  }, []);

  return { publications, loading, updatePublicationComments }; // Exponemos la función de actualización
};

export default usePublications;
