import cloudinary from "cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Initialize memory storage

// Function to handle image upload to Cloudinary
async function imageUploadUtil(file) {
  try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto", // Automatically detect the resource type
        });

        return result;
        
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw new Error("Failed to upload image to Cloudinary");
    }
}

const upload = multer({ storage }); // Initialize multer with memory storage

export { upload, imageUploadUtil };