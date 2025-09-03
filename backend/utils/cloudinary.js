import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config(); // ✅ Load env variables here



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "defined" : "undefined",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "defined" : "undefined",
});

export default cloudinary;
