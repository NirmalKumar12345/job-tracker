import express from "express";
import upload from '../middleware/upload.middleware.js';
import authMiddleware from "../middleware/auth.middleware.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/get",authMiddleware,getProfile);

router.patch("/update",authMiddleware,upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "resume", maxCount: 1 }
]),updateProfile);

export default router;


