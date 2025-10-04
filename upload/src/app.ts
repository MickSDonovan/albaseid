import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import router from "./routes/index.route.js";
import path from "path";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// Middleware pour parser du JSON
app.use(express.json());

app.use(morgan("dev"));

// ✅ Servir les fichiers statiques du dossier "uploads"
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Endpoint de test
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Healthcheck at http://localhost:${PORT}/api/health`);
  console.log(`Uploads accessible at http://localhost:${PORT}/uploads`);
});
