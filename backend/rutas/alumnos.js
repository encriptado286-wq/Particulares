import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Obtener alumnos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumnos ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener alumnos:', error);
    res.status(500).json({ 
      error: 'Error al obtener alumnos', 
      details: error.message, 
      stack: error.stack 
    });
  }
});

// Agregar alumno
router.post('/', async (req, res) => {
  const { nombre, grado, telefono } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO alumnos (nombre, grado, telefono) VALUES ($1, $2, $3) RETURNING *',
      [nombre, grado, telefono]
    );
    res.status(201).json(result.rows[0]); // Devuelve el alumno creado
  } catch (error) {
    console.error('❌ Error al agregar alumno:', error);
    res.status(500).json({ 
      error: 'Error al agregar alumno', 
      details: error.message, 
      stack: error.stack 
    });
  }
});

export default router;