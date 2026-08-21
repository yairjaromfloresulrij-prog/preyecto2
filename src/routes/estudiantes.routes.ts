import { Router } from "express";
import type { Request, Response } from "express";
import type { Estudiante } from "../types/estudiantes.types.js";
import estudiantesData from "../lista.json" with { type: "json" };
const router: Router = Router();

const estudiantes: Estudiante[] = estudiantesData;

router.get("/", function (req: Request, res: Response) {
  // #swagger.tags = ['Estudiantes']
  // #swagger.summary = 'Obtener todos los estudiantes'
  const bootcamp = req.query.bootcamp;

  if (bootcamp) {
    const filtrados = estudiantes.filter((e) => {
      e.bootcamp === bootcamp;
    });
    return res.json(filtrados);
  }
  res.json(estudiantes);
});

router.get("/:id", function (req: Request, res: Response) {
  const id = Number(req.params.id);

  const estudiante = estudiantes.find((e) => {
    return e.id === id;
  });

  if (!estudiante) {
    return res.status(404).json({
      error: "Estudiante no encontrado",
    });
  }

  res.json(estudiante);
});

router.post("/", function (req: Request, res: Response) {
  // #swagger.tags = ['Estudiantes']
  // #swagger.summary = 'Crear un nuevo estudiante'
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
router.delete("/:id", function (req: Request, res: Response) {
  // #swagger.tags = ['Estudiantes']
  // #swagger.summary = 'Eliminar un estudiante'
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
router.put("/:id", function (req: Request, res: Response) {
  // #swagger.tags = ['Estudiantes']
  // #swagger.summary = 'Actualizar un estudiante'
  const idBuscado = Number(req.params.id);

  const index = estudiantes.findIndex(function (e) {
    return e.id === idBuscado;
  });

  if (index === -1) {
    return res.status(404).json({
      error: "Estudiante no encontrado",
    });
  } else {
    const { nombre, email, bootcamp }: Estudiante = req.body;

    estudiantes[index] = {
      id: idBuscado,
      nombre: nombre ?? estudiantes[index]?.nombre,
      email: email ?? estudiantes[index]?.email,
      bootcamp: bootcamp ?? estudiantes[index]?.bootcamp,
    };

    res.json(estudiantes[index]);
  }
});
export default router;
