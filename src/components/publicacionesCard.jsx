// components/PublicationCard.js
import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";

const PublicationCard = ({ pub, isOpen, onToggle }) => {
  const cardBg = useColorModeValue("gray.100", "gray.700");
  const cardTextColor = useColorModeValue("black", "white");
  const buttonColorScheme = useColorModeValue("blue", "teal");

  return (
    <Box bg={cardBg} borderRadius="md" boxShadow="lg" p={4} mb={4}>
      <Text fontSize="xl" fontWeight="bold" mb={2} color={cardTextColor}>
        {pub.title}
      </Text>
      
      {/* Botón para ver comentarios */}
      <Button
        onClick={() => onToggle(pub._id)}
        leftIcon={<BiChat />}
        variant="outline"
        colorScheme={buttonColorScheme}
        mb={2}
      >
        {isOpen ? "Cerrar comentarios" : "Ver comentarios"}
      </Button>

      {isOpen && (
        <Box mt={4}>
          {/* Mostrar los comentarios */}
          {pub.comments && pub.comments.length > 0 ? (
            pub.comments.map((c, i) => (
              <Box key={i} mb={2}>
                <Text fontSize="sm" fontWeight="medium" color={cardTextColor}>
                  {c.author}:
                </Text>
                <Text fontSize="sm" color={cardTextColor}>
                  {c.content}
                </Text>
              </Box>
            ))
          ) : (
            <Text color={cardTextColor} fontSize="sm">
              No hay comentarios aún.
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PublicationCard;
