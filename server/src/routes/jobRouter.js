import express from "express";
import authMiddleWare from '../middleware/auth.middleware.js'
import adminMiddleware from "../middleware/admin.middleware.js";
import { createJob, deletedJob, getAllAdminJob, getJob, updateJob } from "../controllers/jobController.js";

const router = express.Router();

router.get("/get",authMiddleWare,getJob);

router.post("/create",authMiddleWare,adminMiddleware,createJob);

router.get("/getAll",authMiddleWare,adminMiddleware,getAllAdminJob);

router.put("/update/:id",authMiddleWare,adminMiddleware,updateJob);

router.delete("/delete/:id",authMiddleWare,adminMiddleware,deletedJob)

export default router;