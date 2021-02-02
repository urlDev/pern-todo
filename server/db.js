// Connection our db
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: process.env.PASSWORD,
  host: 'localhost',
  port: 5432,
  // database name we picked
  database: 'perntodo',
});

module.exports = pool;
