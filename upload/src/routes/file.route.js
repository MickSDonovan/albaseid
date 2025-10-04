import { Router } from "express";

import fileControllerInstance from "../controllers/file.controller.js";

const router = Router();

router.get("/", (req, res) => fileControllerInstance.getAll(req, res));
router.get("/:id", (req, res) => fileControllerInstance.getById(req, res));
router.post("/", (req, res) => fileControllerInstance.create(req, res));
router.patch("/:id", (req, res) => fileControllerInstance.update(req, res));
router.delete("/:id", (req, res) => fileControllerInstance.delete(req, res));

export default router;
