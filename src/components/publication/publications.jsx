import React from "react";
import { Text, useColorModeValue, SimpleGrid, Spinner } from "@chakra-ui/react";
import usePublications from "../../hooks/usePublications.jsx"; // Ajusta la ruta
import PublicationCard from "./publicacionesCard.jsx";

const Publications = ({ openComments, setOpenComments }) => {
  const { publications, loading, error } = usePublications();
  const bg = useColorModeValue("white", "gray.700");

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;

  const handleToggleComments = (id) => {
    setOpenComments(openComments === id ? null : id);
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 3    }} spacing={8}>
      {publications.map((pub) => (
        <PublicationCard
          key={pub._id}
          pub={pub}
          isOpen={openComments === pub._id}
          onToggle={handleToggleComments}
        />
      ))}
    </SimpleGrid>
  );
};

export default Publications;
