import express from "express";
import type { Request, Response } from "express";
import estudiantesRouter from "./routes/estudiantes.routes.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use("/api/estudiantes", estudiantesRouter);
const objetoJSON = { status: "Servidor en línea", version: "1.0.0" };

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../src/swagger_output.json" with { type: "json" };

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get("/api/status", function (req, res) {
  res.send(objetoJSON);
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
