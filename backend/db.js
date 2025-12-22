import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'particulares_db_kog5_user',
  host: 'dpg-d54nmnv5r7bs73ej60t0-a',
  database: 'particulares_db',
  password: '5N1Jmr2ktNC0MosPezKLqhCU2XaQl8fv',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(() => console.log('✅ Conectado a la base de datos'))
  .catch(err => console.error('❌ Error conectando a la base de datos:', err));

export default pool;