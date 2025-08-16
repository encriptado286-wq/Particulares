import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import alumnosRouter from './rutas/alumnos.js';
import registrosRouter from './rutas/registros.js';


dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

// Rutas de tu API
app.use('/api/alumnos', alumnosRouter);
app.use('/api/registros', registrosRouter);

// Servir el frontend (React build)
app.use(express.static(path.join(__dirname, 'dist')));

// Redirigir todas las rutas no encontradas al index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});