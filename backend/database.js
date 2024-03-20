//* Establish connection to the database
require("dotenv").config();

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "34.170.231.213",
  database: "postgres",
  password: "admin",
  port: 5432, // Default port for PostgreSQL
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
