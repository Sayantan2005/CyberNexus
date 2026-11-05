import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { updateProfile } from "../controllers/userController.js";
const router = Router();
router.put("/me", protect, updateProfile);
export default router;
