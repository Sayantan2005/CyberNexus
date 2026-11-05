import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { toggleBookmark, listBookmarks } from "../controllers/bookmarkController.js";
const router = Router();
router.get("/", protect, listBookmarks);
router.post("/:itemId", protect, toggleBookmark);
export default router;
