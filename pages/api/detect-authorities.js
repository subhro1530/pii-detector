// pages/api/detect-authorities.js
import { HfInference } from "@huggingface/inference";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Initialize Hugging Face inference
const hf = new HfInference("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");

export const config = {
  api: {
    bodyParser: false,
  },
};

const detectAuthorities = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "/tmp");
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the file:", err);
      return res.status(500).json({ error: "Error parsing the file" });
    }

    // Check if the file object is correctly provided
    if (!files.file || !files.file[0] || !files.file[0].filepath) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = files.file[0].filepath;

    try {
      // Read and classify the image
      const image = fs.readFileSync(filePath);
      const base64Image = image.toString("base64");

      // Note: Verify the correct method and parameters for classification
      const result = await hf.imageClassification({
        model: "openai/clip-vit-base-patch32", // CLIP model for zero-shot classification
        image: base64Image,
        labels: ["government authority", "official"],
      });

      // Check the result and send the response
      if (result.label && result.label === "government authority") {
        res.status(200).json({
          message: "Government authority detected!",
          description: result.label,
        });
      } else {
        res
          .status(200)
          .json({ message: "No government authority found in the image." });
      }
    } catch (error) {
      console.error("Error processing the image:", error);
      res.status(500).json({ error: "Error processing the image" });
    }
  });
};

export default detectAuthorities;
