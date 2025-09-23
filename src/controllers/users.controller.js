import BaseController from "./_base.controller.js";
import { prisma } from "../models/index.js";

class BaseUserController extends BaseController {
  constructor() {
    super(prisma.user);
  }
}

const BaseUserControllerInstance = new BaseUserController();

export default BaseUserControllerInstance;
