import express from "express";
import pool from "../db.js";

const router = express.Router();

class Alumno {
  constructor(id, nombre, telefono, grado, foto) {
    this.id = id;
    this.nombre = nombre;
    this.telefono = telefono;
    this.grado = grado;
    this.foto = foto;
  }

 // Obtener todos los alumnos
  static async obtenerTodos() {
    const result = await pool.query("SELECT * FROM alumnos ORDER BY id");
    return result.rows.map(
      (row) => new Alumno(row.id, row.nombre, row.telefono, row.grado, row.foto)
    );
  }

  // Agregar un alumno
  static async agregar({ nombre, telefono, grado, foto }) {
    const result = await pool.query(
      "INSERT INTO alumnos (nombre, telefono, grado, foto) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, telefono, grado, foto]
    );
    const row = result.rows[0];
    return new Alumno(row.id, row.nombre, row.telefono, row.grado, row.foto);
  }
}
// ====== RUTAS ======

// RUTA: Obtener todos los alumnos
router.get("/", async (req, res) => {
  try {
    const alumnos = await Alumno.obtenerTodos();
    res.json(alumnos);
  } catch (error) {
    console.error("❌ Error al obtener alumnos:", error);
    res.status(500).json({ error: "Error al obtener alumnos" });
  }
});

// RUTA: Agregar alumno
router.post("/", async (req, res) => {
  try {
    const { nombre, telefono, grado } = req.body;
    const nuevoAlumno = await Alumno.agregar({ nombre, telefono, grado, foto: null});
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    console.error("❌ Error al agregar alumno:", error);
    res.status(500).json({ error: "Error al agregar alumno" });
  }
});


export default router;