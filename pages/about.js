// pages/about.js
import { Container, Heading, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <Container maxW="container.md" py={8}>
        <Heading mb={4}>About Us</Heading>
        <Text>
          This application helps in identifying government-issued personally
          identifiable information (PII) embedded in documents.
        </Text>
      </Container>
    </>
  );
};

export default About;
