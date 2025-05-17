import { useState } from "react";
import {
  Box,
  SimpleGrid,
  Spinner,
  Center,
  Button,
  useColorModeValue,
  Collapse,
} from "@chakra-ui/react";
import PublicationCard from "../components/publicacionesCard";
import usePublications from "../hooks/usePublications";
import { BiCommentAdd } from "react-icons/bi";
import AddCommentForm from "../components/AddCommentForm"; // Asegúrate de importar esto

const Publications = () => {
  const { publications, loading, updatePublicationComments } = usePublications();
  const [openComments, setOpenComments] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  // Manejamos el toggle para mostrar comentarios de publicaciones
  const handleToggleComments = (id) => {
    setOpenComments(openComments === id ? null : id);
  };

  // Mostrar u ocultar el formulario global de comentarios
  const handleCommentFormToggle = () => {
    setShowCommentForm(!showCommentForm);
  };

  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.400" />
      </Center>
    );
  }

  return (
    <Box>
      {/* Sección del formulario global para agregar comentario */}
      <Box mb={6}>
        <Button
          leftIcon={<BiCommentAdd />}
          colorScheme="teal"
          size="lg"
          w="100%"
          onClick={handleCommentFormToggle}
        >
          Agregar Comentario
        </Button>

        <Collapse in={showCommentForm} animateOpacity>
          <Box
            bg={useColorModeValue("gray.50", "gray.800")}
            p={4}
            borderRadius="md"
            mt={4}
            boxShadow="sm"
          >
            <AddCommentForm
              publications={publications}
              onCommentAdded={updatePublicationComments}
            />
          </Box>
        </Collapse>
      </Box>

      {/* Sección de publicaciones */}
      <Box>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8} mt={4}>
          {publications.map((pub) => (
            <PublicationCard
              key={pub._id}
              pub={pub}
              isOpen={openComments === pub._id}
              onToggle={handleToggleComments}
              updatePublicationComments={updatePublicationComments}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Publications;
