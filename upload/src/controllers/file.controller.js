import { prisma } from "../models/index.js";
import BaseController from "./base.controller.js";

class FileController extends BaseController {
  constructor() {
    super(prisma.file);
  }
}

const fileControllerInstance = new FileController();

export default fileControllerInstance;
