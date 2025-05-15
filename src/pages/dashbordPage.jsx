import React, { useState } from "react";
import { Box, chakra, useColorModeValue } from "@chakra-ui/react";
import Publications from "../components/publication/publications";

const DashboardPage = () => {
  const bg = useColorModeValue("white", "gray.800");
  const [openComments, setOpenComments] = useState(null);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")} px={{ base: 4, md: 12 }} py={8}>
      {/* Header aquí si quieres */}

      <chakra.h1 fontSize="3xl" fontWeight="extrabold" mb={2} color={useColorModeValue("gray.700", "gray.200")}>
        Bienvenido al Dashboard
      </chakra.h1>
      <chakra.p fontSize="md" mb={8} color={useColorModeValue("gray.600", "gray.400")}>
        Aquí puedes gestionar publicaciones, ver estadísticas y más.
      </chakra.p>

      <chakra.h2 fontSize="2xl" fontWeight="semibold" mb={6} color={useColorModeValue("gray.700", "gray.300")}>
        Publicaciones recientes
      </chakra.h2>

      <Publications openComments={openComments} setOpenComments={setOpenComments} />
    </Box>
  );
};

export default DashboardPage;
