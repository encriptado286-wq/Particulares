import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import alumnosRouter from './routes/alumnos.js';
import registrosRouter from './routes/registros.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas de tu API
app.use('/alumnos', alumnosRouter);
app.use('/registros', registrosRouter);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('✅ Backend funcionando en Render 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});