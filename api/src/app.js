import "dotenv/config";
import express from "express";
import router from "./routes/index.route.js";
import { createProxyMiddleware } from "http-proxy-middleware";

const PORT = process.env.PORT || 3000;
const app = express();

router.use(
  "/api/upload",
  // Ici on va rediriger toutes les requêtes allant vers `/api/upload` vers le microservice upload-service
  createProxyMiddleware({
    target: `http://localhost:3033/api/upload`,
  })
);

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
