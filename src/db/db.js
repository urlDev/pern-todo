// Connection our db
const Pool = require('pg').Pool;

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = {
  // heroku addon connection string
  connectionString: process.env.DATABASE_URL,
};

// node env comes from heroku as well
const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production' ? proConfig : devConfig,
});

module.exports = pool;
