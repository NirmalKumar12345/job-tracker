import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {
    if (file.fieldname === "resume") {
      return {
        folder: "jobportal/resumes",
        resource_type: "image",
        format: "pdf",
        use_filename: true,
        unique_filename: true,
      };
    }

    if (file.fieldname === "profilePic") {
      return {
        folder: "jobportal/profilePics",
        resource_type: "image",
      };
    }

    return {
      folder: "jobportal",
    };
  },
});

const upload = multer({ storage });

export default upload;