import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { createPost, toggleLike, listComments, createComment } from "../controllers/postController.js";
const router = Router();
router.post("/", protect, createPost);
router.post("/:id/like", protect, toggleLike);
router.get("/:postId/comments", listComments);
router.post("/:postId/comments", protect, createComment);
export default router;
