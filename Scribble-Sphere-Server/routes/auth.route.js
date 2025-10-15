import express from "express";
import { register,verify_code,resend_code,login,google } from "../controllers/auth.controller.js";

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/google",google);
router.post("/verify_code",verify_code)
router.post("/resend_code",resend_code)

export default router;