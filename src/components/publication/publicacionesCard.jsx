import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Text,
  IconButton,
  Button,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";

const PublicationCard = ({ pub, isOpen, onToggle }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const cardHoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Card
      maxW="md"
      mb={6}
      bg={cardBg}
      shadow="md"
      borderRadius="md"
      transition="all 0.3s ease"
      _hover={{ bg: cardHoverBg, cursor: "pointer" }}
    >
      <CardHeader>
        <Flex justify="space-between" align="center" flexWrap="wrap">
          <Heading size="md">{pub.title}</Heading>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="Opciones"
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>

      <CardBody>
        <Text>{pub.description}</Text>
      </CardBody>

      <CardFooter justify="space-between" flexWrap="wrap" gap={2}>
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          Like
        </Button>
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<BiChat />}
          onClick={() => onToggle(pub._id)}
        >
          
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>

      {isOpen && (
        <Box px={6} pb={4} pt={2} w="100%">
          {pub.comments && pub.comments.length > 0 ? (
            pub.comments.map((comment, i) => (
              <Box
                key={i}
                p={3}
                mb={2}
                bg={useColorModeValue("gray.100", "gray.700")}
                borderRadius="md"
                boxShadow="sm"
              >
                <Text fontWeight="semibold">{comment.author}</Text>
                <Text>{comment.content}</Text>
              </Box>
            ))
          ) : (
            <Text color="gray.400">Sin comentarios</Text>
          )}
        </Box>
      )}
    </Card>
  );
};

export default PublicationCard;
