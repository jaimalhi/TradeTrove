//* Establish connection to the database
require("dotenv").config();

const { Pool } = require("pg");
const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASS,
   //    user: "postgres",
   //    host: "34.170.231.213",
   //    database: "postgres",
   //    password: "admin",
   port: 5432, // Default port for PostgreSQL
   ssl: {
      rejectUnauthorized: false,
   },
});

module.exports = pool;
