const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const url = process.env.DATABASE_URL || process.env.DIRECT_URL;
if (!url) {
  console.error('DATABASE_URL yok');
  process.exit(1);
}

const sql = fs.readFileSync(path.join(__dirname, 'apply-vendor-portal.sql'), 'utf8');
const statements = sql
  .split(';')
  .map((s) => s.trim())
  .filter((s) => s && !s.startsWith('--'));

async function main() {
  const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false }, max: 1 });
  for (const statement of statements) {
    try {
      await pool.query(statement);
      console.log('OK', statement.slice(0, 72).replace(/\s+/g, ' '));
    } catch (error) {
      if (String(error.message).includes('already exists')) {
        console.log('SKIP exists', statement.slice(0, 40).replace(/\s+/g, ' '));
      } else {
        console.warn('WARN', error.message);
      }
    }
  }
  await pool.end();
  console.log('Firma portal şeması uygulandı');
}

main();
