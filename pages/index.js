// pages/index.js
import { Container, Heading, Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import UploadDocument from "../components/UploadDocument";

const Home = () => {
  const handleResult = (message) => {
    console.log("Result:", message);
  };

  return (
    <>
      <Navbar />
      <Box
        bg="linear-gradient(135deg, #1A202C, #2D3748)" // Dark gradient background for the main content
        minH="100vh"
        p={8}
      >
        <Container maxW="container.md" py={8}>
          <Heading mb={6} color="gray.200">
            Identify Government-Issued PII
          </Heading>
          <UploadDocument onResult={handleResult} />
        </Container>
      </Box>
    </>
  );
};

export default Home;
