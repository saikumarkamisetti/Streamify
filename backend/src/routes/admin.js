// routes/admin.routes.js

import express from "express";
// import { protectRoute, verifyAdmin } from "../middleware/admin.middleware.js"; 
import { getAllUsers, deleteUser, adminLogin } from "../controller/usercontroller.js";

const router = express.Router();

// Route 1: Get All Users (Requires both Authentication and Admin Role)
// GET /api/admin/users
router.post("/valid",adminLogin);
router.get("/users",getAllUsers);

// Route 2: Delete a User (Requires both Authentication and Admin Role)
// DELETE /api/admin/users/:id
router.delete("/users/:id",deleteUser);

export default router;
