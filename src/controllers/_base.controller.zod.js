import { utilSchema } from "../schemas/utils.schema.js";

export default class BaseController {
  prismaModel;
  schemaCreate;
  schemaUpdate;

  constructor({ prismaModel, schemaCreate, schemaUpdate }) {
    this.prismaModel = prismaModel;
    this.schemaCreate = schemaCreate;
    this.schemaUpdate = schemaUpdate;
  }

  async getAll(req, res) {
    try {
      const { limit, offset, orderBy, direction } = req.query;
      console.log("Query Parameters:", limit, offset, orderBy, direction);
      const items = await this.prismaModel.findMany({
        take: limit ? parseInt(limit) : undefined,
        skip: offset ? parseInt(offset) : undefined,
        orderBy: orderBy ? { [orderBy]: direction || "asc" } : undefined,
      });
      res.json(items);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }

  async getById(req, res) {
    try {
      console.log("Request Params:", req.params);
      const { id } = utilSchema.parseId.parse(req.params);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const item = await this.prismaModel.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ error: "Item not found" });

      res.json(item);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }

  async create(req, res) {
    try {
      const data = this.schemaCreate.parse(req.body);

      if (!data) {
        return res.status(400).json({ error: "Invalid data" });
      }
      const newItem = await this.prismaModel.create({ data });

      res.status(201).json(newItem);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = utilSchema.parseId.parse(req.params);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const data = this.schemaUpdate.parse(req.body);
      if (!data) {
        return res.status(400).json({ error: "Invalid data" });
      }

      const updatedItem = await this.prismaModel.update({
        where: { id },
        data,
      });

      if (!updatedItem) {
        return res.status(404).json({ errorMessage: "Item not found" });
      }
      res.json(updatedItem);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = utilSchema.parseId.parse(req.params);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid id" });
      }

      await this.prismaModel.delete({ where: { id } });
      res.status(204).end();
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
}
