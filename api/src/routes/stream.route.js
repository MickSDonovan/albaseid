import { Router } from "express";

const router = Router();

router.get("/", (_req, res) =>
  res.send("Streaming service is up and running!")
);

export default router;
