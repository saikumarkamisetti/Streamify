import express from "express";
import { login, logout, onboard, signup } from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login", login);
router.post("/logout",logout);

//forget password routes

router.post("/onboarding",protectRoute,onboard);
router.get("/me",protectRoute,(req,res)=>{
    res.status(201).json({success: true,user:req.user});
});

export default router;