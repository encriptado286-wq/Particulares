import express from "express";
import pool from "../db.js";

const router = express.Router();

class Registro {
  constructor(id, alumno_id, fecha, pago) {
    this.id = id;
    this.alumno_id = alumno_id;
    this.fecha = fecha;
    this.pago = pago;
  }

  // Obtener todos los registros
  static async obtenerTodos() {
    const result = await pool.query("SELECT * FROM registros ORDER BY fecha DESC");
    return result.rows.map(
      (row) => new Registro(row.id, row.alumno_id, row.fecha, row.pago)
    );
  }

  // Obtener registros por alumno
  static async obtenerPorAlumno(alumno_id) {
    const result = await pool.query(
      "SELECT * FROM registros WHERE alumno_id = $1 ORDER BY fecha DESC",
      [alumno_id]
    );
    return result.rows.map(
      (row) => new Registro(row.id, row.alumno_id, row.fecha, row.pago)
    );
  }

  // Crear registro
  static async crear({ alumno_id, fecha, pago }) {
    const result = await pool.query(
      "INSERT INTO registros (alumno_id, fecha, pago) VALUES ($1, $2, $3) RETURNING *",
      [alumno_id, fecha, pago]
    );
    const row = result.rows[0];
    return new Registro(row.id, row.alumno_id, row.fecha, row.pago);
  }

  // Actualizar registro
  static async actualizar(id, { alumno_id, fecha, pago }) {
    const result = await pool.query(
      "UPDATE registros SET alumno_id = $1, fecha = $2, pago = $3 WHERE id = $4 RETURNING *",
      [alumno_id, fecha, pago, id]
    );
    const row = result.rows[0];
    return new Registro(row.id, row.alumno_id, row.fecha, row.pago);
  }
}

// ====== RUTAS ======

// Obtener todos
router.get("/", async (req, res) => {
  try {
    const registros = await Registro.obtenerTodos();
    res.json(registros);
  } catch (err) {
    console.error("❌ Error al obtener registros:", err);
    res.status(500).json({ error: "Error al obtener registros" });
  }
});

// Obtener por alumno
router.get("/alumno/:id", async (req, res) => {
  try {
    const registros = await Registro.obtenerPorAlumno(req.params.id);
    res.json(registros);
  } catch (err) {
    console.error("❌ Error al obtener registros de alumno:", err);
    res.status(500).json({ error: "Error al obtener registros de alumno" });
  }
});

// Crear
router.post("/", async (req, res) => {
  try {
    const nuevo = await Registro.crear(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error("❌ Error al crear registro:", err);
    res.status(500).json({ error: "Error al crear registro" });
  }
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Registro.actualizar(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    console.error("❌ Error al actualizar registro:", err);
    res.status(500).json({ error: "Error al actualizar registro" });
  }
});

export default router;