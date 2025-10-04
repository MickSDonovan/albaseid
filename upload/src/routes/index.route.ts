import { Router } from "express";
import healthRoute from "./health.route.js";
import uploadRoute from "./upload.route.js";

const router = Router();

router.use("/health", healthRoute);
router.use("/upload", uploadRoute);

export default router;
