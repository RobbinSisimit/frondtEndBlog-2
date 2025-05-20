import React, { useEffect, useState } from "react";
import { SimpleGrid, Box, useDisclosure, Button, HStack } from "@chakra-ui/react";
import PublicationCard from "../components/Publications/PublicationCard";
import PublicationModal from "../components/Publications/PublicationModal";
import { getPublications } from "../services/api";

const categories = ["All", "Taller", "Tecnologia", "Practica_Supervisada"];

const DashboardPage = () => {
  const [publications, setPublications] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
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

  const filteredPublications =
    filterCategory === "All"
      ? publications
      : publications.filter((pub) => pub.category === filterCategory);

  return (
    <Box p={6}>
      <HStack mb={6}>
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            colorScheme={filterCategory === cat ? "blue" : "gray"}
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </HStack>

      {/* Lista filtrada */}
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {filteredPublications.map((pub) => (
          <PublicationCard
            key={pub._id}
            pub={pub}
            viewMode="grid"
            onOpenModal={openModal}
          />
        ))}
      </SimpleGrid>

      {/* Modal detalle publicación */}
      <PublicationModal
        isOpen={isOpen}
        onClose={onClose}
        publication={selectedPublication}
      />
    </Box>
  );
};

export default DashboardPage;
