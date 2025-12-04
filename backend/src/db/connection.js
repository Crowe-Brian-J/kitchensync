const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  // accept either DB_NAME or POSTGRES_DB (Docker's postgres image uses POSTGRES_DB)
  database: process.env.DB_NAME || process.env.POSTGRES_DB || 'kitchensync',
  // accept either DB_USER or POSTGRES_USER
  user: process.env.DB_USER || process.env.POSTGRES_USER || 'kitchensync_user',
  // accept either DB_PASSWORD or POSTGRES_PASSWORD
  password:
    process.env.DB_PASSWORD ||
    process.env.POSTGRES_PASSWORD ||
    'kitchensync_pass'
})

module.exports = pool
