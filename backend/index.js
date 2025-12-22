import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from "fs";
import path from "path";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
import alumnosRouter from './rutas/alumnos.js';
import registrosRouter from './rutas/registros.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rutas de tu API
app.use('/api/alumnos', alumnosRouter);
app.use('/api/registros', registrosRouter);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('✅ Backend funcionando en Render 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});