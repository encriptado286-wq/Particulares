import express from 'express';
import cors from 'cors';
import alumnosRoutes from './rutas/alumnos.js';
import registrosRoutes from './rutas/registros.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/alumnos', alumnosRoutes);
app.use('/api/registros', registrosRoutes);

app.listen(5000, () => {
  console.log('Servidor en puerto 5000');
});