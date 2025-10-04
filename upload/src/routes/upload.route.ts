import { Router } from "express";
import { uploadFileLocal } from "../controllers/upload.controller.js";

const router = Router();

router.post("/", uploadFileLocal);

export default router;
