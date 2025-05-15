import React from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  Divider,
} from "@chakra-ui/react";
import usePublications from "../hooks/usePublications.jsx";

const PublicationsPage = () => {
  const { publications, loading, error } = usePublications();

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        Lista de Publicaciones
      </Heading>

      {loading && (
        <Box textAlign="center" py={10}>
          <Spinner size="xl" />
        </Box>
      )}

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Stack spacing={6}>
        {publications.map((pub) => (
          <Box key={pub._id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading fontSize="xl">{pub.title}</Heading>
            <Text mt={2}>{pub.description}</Text>
            <Divider mt={4} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default PublicationsPage;
