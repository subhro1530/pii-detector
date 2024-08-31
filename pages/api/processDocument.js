// pages/api/processDocument.js

import { IncomingForm } from "formidable";
import { promisify } from "util";
import { pipeline } from "stream";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = promisify(new IncomingForm().parse);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { files } = await parseForm(req);

      if (!files.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Assuming 'file' is the uploaded file object
      const filePath = files.file.filepath;

      // Make API request
      const apiKey = "K87499319188957";
      const response = await fetch("https://api.someocrservice.com/ocr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ filePath }),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: data.message });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error("Error in API route:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};
