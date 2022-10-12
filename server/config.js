require('dotenv').config()

const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'prod'

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString: connectionString,
  ssl: isProduction,
})

module.exports = { pool }