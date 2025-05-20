import React from "react";
import {
  Box,
  Text,
  Stack,
  Heading,
  Divider,
  Button,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";

const PublicationCard = ({ pub, viewMode, onOpenModal }) => {
  return viewMode === "grid" ? (
    <Box
      key={pub._id}
      p={6}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="2xl"
      rounded="lg"
      cursor="pointer"
      onClick={() => onOpenModal(pub)}
    >
      <Stack pt={5} spacing={3} flex={1}>
        <Heading fontSize="xl">{pub.title}</Heading>
        <Text noOfLines={3}>{pub.description}</Text>
        <Text color="gray.500">Curso: {pub.category}</Text>
        <Text color="gray.500">
          Fecha: {new Date(pub.createdAt).toLocaleDateString()}
        </Text>
        <Divider my={4} />
        <Button onClick={() => onOpenModal(pub)} colorScheme="blue" size="sm">
          Ver más
        </Button>
      </Stack>
    </Box>
  ) : (
    <Box
      key={pub._id}
      p={4}
      w="full"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="2xl"
      rounded="lg"
      cursor="pointer"
      onClick={() => onOpenModal(pub)}
    >
      <HStack align="start">
        <Stack spacing={2} flex={1}>
          <Heading fontSize="lg">{pub.title}</Heading>
          <Text noOfLines={4}>{pub.description}</Text>
          <Text color="gray.500">Curso: {pub.category}</Text>
          <Text color="gray.500">
            Fecha: {new Date(pub.createdAt).toLocaleDateString()}
          </Text>
          <Button onClick={() => onOpenModal(pub)} colorScheme="blue" size="sm">
            Ver más
          </Button>
        </Stack>
      </HStack>
    </Box>
  );
};

export default PublicationCard;
