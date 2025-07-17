import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '202.10.43.63',
  user: 'minq6397',
  password: 'Au6KkTNz9YaK39',
  database: 'minq6397_kgprotool'
});

export default pool;