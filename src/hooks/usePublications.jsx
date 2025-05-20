import { useState, useEffect } from "react";
import { getPublications } from "../services/api";

const usePublications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPublications = async () => {
    setLoading(true);
    const response = await getPublications();
    if (!response.error) {
      setPublications(response.data.publications);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  return { publications, loading, fetchPublications };
};

export default usePublications;
