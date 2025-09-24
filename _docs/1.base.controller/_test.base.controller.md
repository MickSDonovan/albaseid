<!-- import type { Request, Response } from "express";

export default class BaseController {
  prismaDelegate: any;

  constructor(prismaDelegate: any) {
    this.prismaDelegate = prismaDelegate;
  }

  async getAll(req: Request, res: Response) {
    const items = await this.prismaDelegate.findMany();
    res.json(items);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const item = await this.prismaDelegate.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ error: "Item not found" });

    res.json(item);
  }
} -->
