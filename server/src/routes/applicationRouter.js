import express from 'express';
import { applyJob, getAllApplications, getUserApplication, updateApplicationStatus } from '../controllers/applicationController.js';
import authMiddleware from '../middleware/auth.middleware.js';
import adminMiddleware from '../middleware/admin.middleware.js';
import applicationMiddleware from '../middleware/application.middleware.js';
import upload from '../middleware/upload.middleware.js';
import { checkSchema } from 'express-validator';
import { applyJobValidationSchema, updateApplicationValidationSchema } from '../validations/applicationValidation.js';
import validate from '../middleware/validate.js';

const router = express.Router();

router.get("/getAll",authMiddleware,adminMiddleware,getAllApplications);

router.post("/apply",authMiddleware,applicationMiddleware,upload.single("resume"),checkSchema(applyJobValidationSchema),validate,applyJob);

router.put("/update/:id/status",authMiddleware,adminMiddleware,checkSchema(updateApplicationValidationSchema),validate,updateApplicationStatus);

router.get("/getUser",authMiddleware,applicationMiddleware,getUserApplication)

export default router;