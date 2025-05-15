import { useState, useEffect } from "react";
import { getPublications } from "../services/api";

const usePublications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return { publications, loading };
};

export default usePublications;
