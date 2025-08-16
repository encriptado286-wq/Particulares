
import express from 'express';
import pool from '../db.js'; // conexión a PostgreSQL

const router = express.Router();

// Obtener todos los registros
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM registros ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener registros por alumno
router.get('/alumno/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM registros WHERE alumno_id = $1 ORDER BY fecha DESC',
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo registro
router.post('/', async (req, res) => {
  const { alumno_id, fecha, pago } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO registros (alumno_id, fecha, pago) VALUES ($1, $2, $3) RETURNING *',
      [alumno_id, fecha, pago]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar registro
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { alumno_id, fecha, pago } = req.body;
  try {
    const result = await pool.query(
      'UPDATE registros SET alumno_id = $1, fecha = $2, pago = $3 WHERE id = $4 RETURNING *',
      [alumno_id, fecha, pago, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;