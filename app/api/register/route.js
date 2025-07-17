import pool from '@/lib/db';
import bcrypt from 'bcrypt';

const jsonheader = { 'Content-Type': 'application/json' };
const response = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: jsonheader });

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const { email, password, role, ganteng } = Object.fromEntries(new URLSearchParams(rawBody));

    if (ganteng !== 'kgprotool') {
      return response({ status: 'failed', message: 'Forbidden: Invalid parameter' }, 403);
    }

    if (!email || !password) {
      return response({ status: 'failed', message: 'Email & password required' }, 400);
    }

    const [rows] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length) {
      return response({ status: 'failed', message: 'Email already registered' }, 409);
    }

    const hash = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (email, password, status, role) VALUES (?, ?, 'nolicense', ?)`;
    await pool.execute(sql, [email, hash, role || 'user']);

    return response({
      status: 'success',
      message: 'Registration successfully'
    });
  } catch (err) {
    console.error('Register Error:', err);
    return response({ status: 'error', message: 'Internal server error' }, 500);
  }
}
