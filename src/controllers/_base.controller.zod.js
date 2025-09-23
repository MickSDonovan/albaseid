import { utilSchema } from "../schemas/utils.schema.js";

export default class BaseController {
  prismaDelegate;
  schemaCreate;

  constructor(prismaDelegate, schemaCreate) {
    this.prismaDelegate = prismaDelegate;
    this.schemaCreate = schemaCreate;
  }

  async getAll(req, res) {
    try {
      const items = await this.prismaDelegate.findMany();
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

      const item = await this.prismaDelegate.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ error: "Item not found" });

      res.json(item);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }

  // INSTALLER ZOD ET AJOUTER LA VALIDATION
  async create(req, res) {
    try {
      const data = this.schemaCreate.parse(req.body);

      if (!data) {
        return res.status(400).json({ error: "Invalid data" });
      }
      const newItem = await this.prismaDelegate.create({ data });

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

      const data = req.body;
      if (!data.name && !data.email) {
        return res.status(400).json({ error: "Invalid data" });
      }

      const updatedItem = await this.prismaDelegate.update({
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

      await this.prismaDelegate.delete({ where: { id } });
      res.status(204).end();
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
}
