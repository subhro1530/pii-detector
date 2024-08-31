// components/Navbar.js
import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      bg="linear-gradient(135deg, #2D3748, #1A202C)" // Dark gradient background for Navbar
      color="gray.200" // Light text color
      px={4}
      boxShadow="md"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            PII Detector
          </Text>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </HStack>
        </HStack>
        <Flex alignItems="center" display={{ base: "flex", md: "none" }}>
          <Button
            onClick={isOpen ? onClose : onOpen}
            variant="outline"
            aria-label="Toggle navigation"
          >
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </Button>
        </Flex>
      </Flex>
      <Box display={{ base: isOpen ? "block" : "none", md: "none" }} p={4}>
        <HStack as="nav" spacing={4} flexDirection="column">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </HStack>
      </Box>
    </Box>
  );
};

export default Navbar;
