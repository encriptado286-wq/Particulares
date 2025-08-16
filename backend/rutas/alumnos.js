import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumnos ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener alumnos:', error);
    res.status(500).json({ error: 'Error al obtener alumnos' });
  }
});

router.post('/', async (req, res) => {
  const { nombre, grado, telefono } = req.body;

  if (!nombre || !grado) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const query = `
      INSERT INTO alumnos (nombre, grado, telefono)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [nombre, grado, telefono || null];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error insertando alumno:', error);
    res.status(500).json({ error: 'Error al insertar alumno' });
  }
});

export default router;