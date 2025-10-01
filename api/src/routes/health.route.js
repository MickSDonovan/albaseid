import { Router } from "express";

const router = Router();

router.get("/", (_req, res) =>
  res.send({ status: "All systems operational", timestamp: new Date() })
);

export default router;
