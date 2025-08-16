import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import alumnosRouter from './rutas/alumnos.js';
import registrosRouter from './rutas/registros.js';
import pool from './db.js';

dotenv.config();
const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/alumnos', alumnosRouter);
app.use('/api/registros', registrosRouter);

// Servir frontend desde carpeta build
app.use(express.static(path.join(__dirname, 'dist')));

// SPA rewrite: todas las rutas van a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});