import formidable from "formidable";
import path from "node:path";
import crypto from "node:crypto";
import { prisma } from "../models/index.js";

export async function uploadFileLocal(req, res) {
  const uploadDir = path.join(import.meta.dirname, "../../uploads");

  const form = formidable({
    uploadDir,
    createDirsFromUploads: true,
    keepExtensions: true,
    filename(name, ext, part, form) {
      const currentDate = new Date();
      const newName = crypto.randomBytes(16).toString("hex");
      return `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}/${newName}${ext}`;
    },
  });

  try {
    const [fields, files] = await form.parse(req);

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Récupération du fichier uploadé (quel que soit le nom de champ)
    const file = files.file?.[0] ?? Object.values(files)[0]?.[0];
    if (!file) {
      return res.status(400).json({ error: "No valid file found" });
    }

    // URL publique
    const relativePath = String(file.filepath).split("uploads")[1];
    const url = `http://localhost:3032/uploads${relativePath.replace(
      /\\/g,
      "/"
    )}`;

    // Données sûres pour la BDD
    const size = Number(file.size ?? 0);
    const originalFilename =
      file.originalFilename ??
      (file.originalFilename === ""
        ? "unknown"
        : path.basename(String(file.filepath)));
    const mimetype = file.mimetype ?? "application/octet-stream";

    // newFilename : selon formidable, présent ou pas — on fallback sur le basename
    const newFilename =
      file.newFilename ?? path.basename(String(file.filepath));

    // Insert en BDD
    const saved = await prisma.file.create({
      data: {
        size,
        originalFilename,
        newFilename,
        mimetype,
        url,
      },
    });

    // Réponse enrichie
    res.json({
      url, // utilisable directement par le front
      fileId: saved.id, // id BDD
      meta: saved, // enregistrement complet si tu veux l’afficher/logguer
    });
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: String(err) });
  }
}
