import { Router } from "express";
import health from "./health.route.js";
import users from "./users.route.js";

const router = Router();

router.use("/health", health);
router.use("/users", users);

export default router;
