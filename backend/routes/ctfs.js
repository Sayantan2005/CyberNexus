import { Router } from "express";
import { listCTFs, getCTF } from "../controllers/ctfController.js";
const router = Router();
router.get("/", listCTFs);
router.get("/:id", getCTF);
export default router;
