import express from "express";
import authMiddleWare from '../middleware/auth.middleware.js'
import adminMiddleware from "../middleware/admin.middleware.js";
import { checkSchema } from "express-validator";
import { createJob, deletedJob, getAllAdminJob, getJob, updateJob } from "../controllers/jobController.js";
import { jobValidaionSchema } from "../validations/jobValidation.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.get("/get",authMiddleWare,getJob);

router.post("/create",authMiddleWare,adminMiddleware,checkSchema(jobValidaionSchema),validate,createJob);

router.get("/getAll",authMiddleWare,adminMiddleware,getAllAdminJob);

router.put("/update/:id",authMiddleWare,adminMiddleware,checkSchema(jobValidaionSchema),validate,updateJob);

router.delete("/delete/:id",authMiddleWare,adminMiddleware,deletedJob)

export default router;