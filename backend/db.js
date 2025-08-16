// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render injecta esta variable automáticamente
  ssl: { rejectUnauthorized: false },
});

export default pool;