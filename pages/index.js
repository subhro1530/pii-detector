// pages/index.js

import { useState } from "react";
import { Box, Button, Input, Text, Spinner } from "@chakra-ui/react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/processDocument", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error processing document:", error);
    }

    setLoading(false);
  };

  return (
    <Box p={5} textAlign="center">
      <Text fontSize="2xl" mb={4}>
        Upload Document for OCR
      </Text>
      <Input type="file" onChange={handleFileChange} mb={4} />
      <Button onClick={handleUpload} colorScheme="blue" isDisabled={!file}>
        {loading ? <Spinner size="sm" /> : "Upload and Process"}
      </Button>
      {result && (
        <Box mt={6} p={4} borderWidth="1px" borderRadius="lg">
          <Text fontSize="lg">Document Analysis Result:</Text>
          <Text mt={2}>{JSON.stringify(result, null, 2)}</Text>
        </Box>
      )}
    </Box>
  );
}
