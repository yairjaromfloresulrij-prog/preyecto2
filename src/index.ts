import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;
app.use(express.json());
interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

app.get("/api/estudiantes", function (req: Request, res: Response) {
  res.json(estudiantes);
});

app.post("/api/estudiantes", function (req: Request, res: Response) {
  const { nombre, email, bootcamp } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "El email es obligatorio",
    });
  }

  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre,
    email,
    bootcamp,
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json(nuevoEstudiante);
});

app.delete("/api/estudiantes/:id", function (req: Request, res: Response) {
  const id = Number(req.params.id);

  const posicion = estudiantes.findIndex(function (e) {
    return e.id === id;
  });

  if (posicion === -1) {
    return res.status(404).json({
      error: "Estudiante no encontrado",
    });
  }

  const eliminado = estudiantes.splice(posicion, 1);

  res.json(eliminado[0]);
});
const objetoJSON = { status: "Servidor en línea", version: "1.0.0" };
/* 
no entendi la parte del put :,c
 */
app.get("/api/status", function (req, res) {
  res.send(objetoJSON);
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
