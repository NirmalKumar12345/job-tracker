import express from "express";
import { login, register } from "../controllers/authController.js";
import { checkSchema } from "express-validator";
import { LoginValidationSchema, SignUpValidationSchema } from "../validations/authValidation.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post("/register",checkSchema(SignUpValidationSchema),validate,register);
router.post("/login",checkSchema(LoginValidationSchema),validate,login);

export default router;