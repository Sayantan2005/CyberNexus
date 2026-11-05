import { Router } from "express";
import { listNews, getNews } from "../controllers/newsController.js";
const router = Router();
router.get("/", listNews);
router.get("/:id", getNews);
export default router;
