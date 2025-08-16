import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM alumnos ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    // Log completo del error para debugging
    console.error('❌ Error al obtener alumnos:', error);
    res.status(500).json({ error: 'Error al obtener alumnos', details: error.message });
  }
});

export default router;