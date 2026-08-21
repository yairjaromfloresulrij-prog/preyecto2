import fs from "node:fs/promises";
import path from "node:path";
import type { Estudiante } from "../types/estudiantes.types.js";
import type estudiantesTypes = require("../types/estudiantes.types.js");

export let listaestudiantes: Estudiante[] = [];

export async function cargarDatos() {
  try {
    const ruta = path.resolve("src/lista.json");
    const data = await fs.readFile(ruta, "utf-8");
    listaestudiantes = JSON.parse(data);
    console.log(
      `DATOS CARGADOS EN MEMORIA: ${listaestudiantes.length} estudiantes cargados`,
    );
  } catch (error) {
    console.log("No se encontraron los estudiantes en la lista o lista vacia");
    listaestudiantes = [];
  }
}

export function setListaproductos(nuevaLista: Estudiante[]) {
  listaestudiantes = nuevaLista;
}
