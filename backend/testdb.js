import pool from './db.js';

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Conexión a DB exitosa:', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error conectando a DB:', err);
    process.exit(1);
  }
}

testConnection();