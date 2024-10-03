// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,     // your PostgreSQL username
  host: process.env.DB_HOST,     // localhost or your DB host
  database: process.env.DB_NAME, // workout_app_db
  password: process.env.DB_PASS, // your PostgreSQL password
  port: process.env.DB_PORT,     // default is 5432
});

module.exports = pool;
