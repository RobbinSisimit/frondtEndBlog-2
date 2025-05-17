import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
  Text,
  chakra
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BiCommentAdd } from "react-icons/bi";
import Publications from "../components/publications";

const DashboardPage = () => {
  const [openComments, setOpenComments] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const Links = ["Publicaciones"];

  const NavLink = ({ children }) => (
    <Button
      px={3}
      py={2}
      variant="ghost"
      fontWeight="medium"
      _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
    >
      {children}
    </Button>
  );

  const handleCommentFormToggle = () => {
    setShowCommentForm(!showCommentForm);
  };

  return (
    <>
      {/* Navbar */}
      <Box bg={useColorModeValue("white", "gray.800")} px={4} shadow="md" position="sticky" top="0" zIndex="1000">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Toggle Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Text fontWeight="bold" fontSize="lg">Mi Blog</Text>
            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button onClick={toggleColorMode} variant="ghost">
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Flex>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Contenido principal del blog */}
      <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")} px={{ base: 4, md: 12 }} py={8}>

        <chakra.h2 fontSize="2xl" fontWeight="semibold" mb={6} color={useColorModeValue("gray.700", "gray.300")}>
          Publicaciones recientes
        </chakra.h2>


        {/* Componente de publicaciones */}
        <Publications
          openComments={openComments}
          setOpenComments={setOpenComments}
          showCommentForm={showCommentForm}
          setShowCommentForm={setShowCommentForm}
        />
      </Box>
    </>
  );
};

export default DashboardPage;
