// components/UploadDocument.js
import { useState } from "react";
import { Input, Button, Box, Text, Spinner } from "@chakra-ui/react";

const UploadDocument = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/detect-authorities", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data.message);
      if (onResult) onResult(data.message); // Call parent callback if provided
    } catch (error) {
      setResult("Error processing the file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box borderWidth={1} borderRadius="md" p={4} bg="gray.800">
      <Input
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        onChange={handleFileUpload}
      />
      <Button
        mt={4}
        colorScheme="teal"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <Spinner size="sm" /> : "Upload Document"}
      </Button>
      <Text mt={4} color="gray.200">
        {result}
      </Text>
    </Box>
  );
};

export default UploadDocument;
