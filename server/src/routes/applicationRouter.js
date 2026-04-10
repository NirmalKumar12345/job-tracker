import express from 'express';
import { applyJob, getAllApplications, getUserApplication, updateApplicationStatus } from '../controllers/applicationController.js';
import authMiddleware from '../middleware/auth.middleware.js';
import adminMiddleware from '../middleware/admin.middleware.js';
import applicationMiddleware from '../middleware/application.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.get("/getAll",authMiddleware,adminMiddleware,getAllApplications);

router.post("/apply",authMiddleware,applicationMiddleware,upload.single("resume"),applyJob);

router.put("/update/:id/status",authMiddleware,adminMiddleware,updateApplicationStatus);

router.get("/getUser",authMiddleware,applicationMiddleware,getUserApplication)

export default router;