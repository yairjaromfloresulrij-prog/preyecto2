import express from "express";
import type { Request, Response } from "express";
import estudiantesRouter from "./routes/estudiantes.routes.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use("/api/estudiantes", estudiantesRouter);

const objetoJSON = { status: "Servidor en línea", version: "1.0.0" };

app.get("/api/status", function (req, res) {
  res.send(objetoJSON);
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
/* no se porque me sale error de verda no entendi, 
me sale error en la terminal */
