// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // <- Render lo define automáticamente
  ssl: { rejectUnauthorized: false },         // obligatorio en Render
});

export default pool;