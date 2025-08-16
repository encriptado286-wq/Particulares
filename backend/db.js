// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'particulares_db_user',          // tu usuario
  host: 'dpg-d2f3m6jipnbc739miut0-a',   // internal hostname de Render
  database: 'particulares_db',           // nombre de la DB
  password: '91j9xuN3nsZK1KjHqSxVVVK5iJjH1623', // contraseña
  port: 5432,
  ssl: { rejectUnauthorized: false },     // obligatorio en Render
});

pool.connect()
  .then(() => console.log('✅ Conectado a la base de datos'))
  .catch(err => console.error('❌ Error conectando a la base de datos:', err));

export default pool;