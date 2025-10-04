import { Router } from "express";
// import { config } from "../../config.ts";

const router = Router();

router.get("/", (_req, res) =>
  res.send("Streaming service is up and running!")
);

export default router;
