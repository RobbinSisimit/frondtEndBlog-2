
import { useState } from "react";
import { Box, Button, Input, Textarea, useToast, Spinner, Select, FormLabel } from "@chakra-ui/react";
import useAddComment from "../hooks/useAddComment";

const AddCommentForm = ({ publications, onCommentAdded }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [selectedPublication, setSelectedPublication] = useState(""); // ID de la publicación
  const { loading, error, handleAddComment } = useAddComment();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author.trim() || !content.trim() || !selectedPublication) {
      toast({
        title: "Campos obligatorios",
        description: "Debes seleccionar una publicación e ingresar tu nombre y comentario.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const response = await handleAddComment(selectedPublication, { author, content });

    if (!response.error) {
      toast({
        title: "Comentario agregado",
        description: "Tu comentario fue enviado correctamente.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      setAuthor("");
      setContent("");
      setSelectedPublication("");
      if (onCommentAdded) onCommentAdded();
    } else {
      toast({
        title: "Error",
        description: "No se pudo agregar el comentario. Intenta de nuevo.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handlePublicationChange = (e) => {
    const publicationId = e.target.value;
    setSelectedPublication(publicationId);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderRadius="md" mt={4}>
      <FormLabel>Selecciona una publicación</FormLabel>
      <Select
        placeholder="Selecciona una publicación"
        value={selectedPublication}
        onChange={handlePublicationChange}
        mb={3}
        isDisabled={loading}
      >
        {publications.map((pub) => (
          <option key={pub._id} value={pub._id}>
            {pub.title} {/* Aquí se muestra el título, pero seleccionamos el _id */}
          </option>
        ))}
      </Select>

      {selectedPublication && (
        <Box mb={3}>
          <p><strong>Publicación seleccionada (ID):</strong> {selectedPublication}</p>
        </Box>
      )}

      <Input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Tu nombre"
        mb={3}
        isDisabled={loading}
      />

      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tu comentario"
        mb={3}
        isDisabled={loading}
      />

      <Button type="submit" colorScheme="blue" isLoading={loading} isDisabled={loading}>
        {loading ? <Spinner size="sm" /> : "Agregar comentario"}
      </Button>
    </Box>
  );
};

export default AddCommentForm;
