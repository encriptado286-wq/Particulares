import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import alumnosRoutes from './rutas/alumnos.js';
import registrosRoutes from './rutas/registros.js';

dotenv.config();

const app = express();

// CORS para el frontend
app.use(cors({
  origin: 'https://particulares-front.onrender.com'
}));

app.use(express.json());

// Rutas API con prefijo /api
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/registros', registrosRoutes);
app.get('/api/config', (req, res) => {
  res.json({ apiUrl: process.env.API_URL });
});

// Puerto dinámico para Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});