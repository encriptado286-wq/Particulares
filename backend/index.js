import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import alumnosRoutes from './rutas/alumnos.js';
import registrosRoutes from './rutas/registros.js';

dotenv.config(); // lee .env

const app = express();
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/alumnos', alumnosRoutes);
app.use('/registros', registrosRoutes);

// Ruta para que el frontend obtenga la URL del backend
app.get('/config', (req, res) => {
  res.json({ apiUrl: process.env.API_URL });
});

app.listen(5000, () => {
  console.log('Servidor en puerto 5000');
});