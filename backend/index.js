//* This file is the entry point of the application
const express = require("express");
let cors = require("cors");
const pool = require("./database");
const customerRoutes = require("./controllers/customerController");
const tradieRoutes = require("./controllers/tradieController");
const authRoutes = require("./controllers/AuthController");

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json()); // parsing body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use routes from controllers
app.use("/api/customers", customerRoutes);
app.use("/api/tradies", tradieRoutes);
app.use("/api/auth", authRoutes);

// Initialize the database
async function init() {
   const usersTable =
      "CREATE TABLE IF NOT EXISTS Users (uid VARCHAR(30) UNIQUE, email VARCHAR(255) UNIQUE, password VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255), tradie BOOLEAN, PRIMARY KEY (uid))";

   const tradieTable =
      "CREATE TABLE IF NOT EXISTS Tradies (tid SERIAL, uid VARCHAR(30) UNIQUE, skills VARCHAR[], years_experience INT CHECK (years_experience >= 0), PRIMARY KEY (tid), FOREIGN KEY (uid) REFERENCES Users(uid) ON DELETE CASCADE)";

   const jobsTable =
      "CREATE TABLE IF NOT EXISTS Jobs (jid SERIAL, uid VARCHAR(30), trade_type VARCHAR(255), location VARCHAR(255), description TEXT, PRIMARY KEY (jid, uid), FOREIGN KEY (uid) REFERENCES Users(uid) ON DELETE CASCADE)";

   await pool.query(usersTable);
   await pool.query(tradieTable);
   await pool.query(jobsTable);
}

// Initialize the database and start the server
async function initDatabaseAndStartServer() {
   try {
      await init();
      app.listen(PORT, "0.0.0.0", () => {
         console.log(`App listening at http://localhost:${PORT}`);
      });
   } catch (err) {
      console.error("Failed to initialize the database & start the server:", err);
   }
}

initDatabaseAndStartServer();
