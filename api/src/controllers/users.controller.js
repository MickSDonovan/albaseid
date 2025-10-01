import BaseController from "./_base.controller.zod.js";
import { prisma } from "../models/index.js";
import { usersSchema } from "../schemas/users.schema.js";

class BaseUserController extends BaseController {
  constructor() {
    super({
      prismaModel: prisma.user,
      schemaCreate: usersSchema.create,
      schemaUpdate: usersSchema.create,
    });
  }
}

const BaseUserControllerInstance = new BaseUserController();

export default BaseUserControllerInstance;
