import React, { useEffect, useState } from "react";
import { SimpleGrid, Box, useDisclosure } from "@chakra-ui/react";
import PublicationCard from "../components/Publications/PublicationCard";
import PublicationModal from "../components/Publications/PublicationModal";
import { getPublications } from "../services/api";

const DashboardPage = () => {
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await getPublications();
        if (!response.error) {
          setPublications(response.publication);
        } else {
          setPublications([]);
        }
      } catch (error) {
        setPublications([]);
      }
    };
    fetchPublications();
  }, []);

  const openModal = (pub) => {
    setSelectedPublication(pub);
    onOpen();
  };

  return (
    <Box p={6}>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {publications.map((pub) => (
          <PublicationCard
            key={pub._id}
            pub={pub}
            viewMode="grid"
            onOpenModal={openModal}
          />
        ))}
      </SimpleGrid>

      <PublicationModal
        isOpen={isOpen}
        onClose={onClose}
        publication={selectedPublication}
        // Agrega las props para manejar comentarios si las tienes
      />
    </Box>
  );
};

export default DashboardPage;
