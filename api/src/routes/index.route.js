import { Router } from "express";
import health from "./health.route.js";
import users from "./users.route.js";
import stream from "./stream.route.js";

const router = Router();

router.use("/health", health);
router.use("/users", users);
router.use("/stream", stream);

export default router;
