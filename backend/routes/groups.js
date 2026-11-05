import { Router } from "express";
import { listGroups, createGroup, joinGroup, groupPosts } from "../controllers/groupController.js";
import { protect } from "../middleware/auth.js";
const router = Router();
router.get("/", listGroups);
router.post("/", protect, createGroup);
router.post("/:id/join", protect, joinGroup);
router.get("/:id/posts", groupPosts);
export default router;
