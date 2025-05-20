import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  Divider,
  Heading,
  VStack,
  HStack,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Trash } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import { useComment } from "../../hooks/useComment";

const PublicationModal = ({ isOpen, onClose, publication }) => {
  const { control, handleSubmit, reset } = useForm();

  // Estados para los modales de comentarios
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  // Hook personalizado de comentarios
  const { comments, setComments, addComment, deleteComment, updateComment } = useComment();

  // Cargar comentarios cuando cambie la publicación
  useEffect(() => {
    if (publication?.comments) {
      setComments(publication.comments);
    }
  }, [publication]);

  if (!publication) return null;

  const openCommentModal = () => setIsCommentModalOpen(true);
  const closeCommentModal = () => setIsCommentModalOpen(false);

  const openEditCommentModal = () => setIsEditCommentModalOpen(true);
  const closeEditCommentModal = () => setIsEditCommentModalOpen(false);

  const onSubmit = (data) => {
    addComment({
      author: data.commentAuthor,
      content: data.commentText,
      publication: publication._id,
    });
    reset();
    closeCommentModal();
  };

  return (
    <>
      {/* Modal Detalle Publicación */}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{publication.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">{publication.description}</Text>
            <Image
              rounded="lg"
              height={200}
              width="100%"
              objectFit="cover"
              src={publication.image}
              alt="Imagen de la publicación"
              mb={4}
            />
            <Text><strong>Curso:</strong> {publication.category}</Text>
            <Text><strong>Autor:</strong> {publication.author}</Text>
            <Text><strong>Fecha:</strong> {new Date(publication.createdAt).toLocaleDateString()}</Text>
            <Divider my={4} />
            <Heading size="md" mt={4}>Comentarios</Heading>
            <VStack align="start" mt={2} spacing={2} w="full" maxH="300px" overflowY="auto">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <VStack
                    key={comment._id || comment.uid}
                    p={2}
                    rounded="md"
                    w="full"
                    align="start"
                    spacing={1}
                  >
                    <HStack w="full" justify="space-between">
                      <Text
                        onClick={() => {
                          setSelectedComment(comment);
                          openEditCommentModal();
                        }}
                        cursor="pointer"
                      >
                        <strong>{comment.author}:</strong> {comment.content || comment.comment}
                      </Text>
                      <IconButton
                        aria-label="Eliminar comentario"
                        icon={<Trash />}
                        size="sm"
                        onClick={() => deleteComment(publication._id, comment._id || comment.uid)}
                      />
                    </HStack>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </Text>
                  </VStack>
                ))
              ) : (
                <Text color="gray.500">No hay comentarios aún.</Text>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Cerrar</Button>
            <Button colorScheme="teal" onClick={openCommentModal}>Comentar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Agregar Comentario */}
      <Modal blockScrollOnMount={false} isOpen={isCommentModalOpen} onClose={closeCommentModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Agregar Comentario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Controller
                  name="commentAuthor"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input placeholder="Autor del comentario" {...field} />
                  )}
                />
                <Controller
                  name="commentText"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input placeholder="Comentario..." {...field} />
                  )}
                />
                <Button colorScheme="teal" type="submit">Enviar Comentario</Button>
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeCommentModal}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Editar Comentario */}
      <Modal isOpen={isEditCommentModalOpen} onClose={closeEditCommentModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Comentario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={selectedComment?.content || selectedComment?.comment || ""}
              onChange={(e) =>
                setSelectedComment((prev) => ({
                  ...prev,
                  content: e.target.value,
                  comment: e.target.value,
                }))
              }
              placeholder="Editar tu comentario..."
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                updateComment(selectedComment._id || selectedComment.uid, {
                  content: selectedComment.content || selectedComment.comment,
                });
                closeEditCommentModal();
              }}
            >
              Guardar Cambios
            </Button>
            <Button ml={3} onClick={closeEditCommentModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PublicationModal;
