import { Router } from "express";
import healthRoute from "./health.route.js";
import uploadRoute from "./upload.route.js";
import fileRoute from "./file.route.js";

const router = Router();

router.use("/health", healthRoute);
router.use("/upload", uploadRoute);
router.use("/files", fileRoute);

export default router;
