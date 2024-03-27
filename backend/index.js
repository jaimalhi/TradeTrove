//* This file is the entry point of the application
const express = require("express");
let cors = require("cors");
const pool = require("./database");
const sample = require("./utils/SampleData");
const path = require("path");
var cookieParser = require("cookie-parser");

// Controllers
const customerRoutes = require("./controllers/CustomerController");
const tradieRoutes = require("./controllers/tradieController");
const authRoutes = require("./controllers/AuthController");
const userRoutes = require("./controllers/UserController");

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json()); // parsing body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
   cors({
        origin: "http://localhost:3000",
      // origin: "http://34.121.253.218",
      credentials: true,
   })
);

// static files
app.use("/", express.static(path.join(__dirname, "./static"), { index: ["index.html"] }));
app.use("/", (req, res, next) => {
   console.log("req.url", req.url);
   next();
});

// Use routes from controllers
app.use("/api/customers", customerRoutes);
app.use("/api/tradies", tradieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// routes for react app, Catch-all handler for any request that doesn't match the ones above
app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "./static", "index.html"));
});

// Initialize the database
async function init() {
   const usersTable =
      "CREATE TABLE IF NOT EXISTS Users (uid VARCHAR(30) UNIQUE, email VARCHAR(255) UNIQUE, password VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255), phone_num VARCHAR(10), tradie BOOLEAN, PRIMARY KEY (uid))";

   const tradieTable =
      "CREATE TABLE IF NOT EXISTS Tradies (tid SERIAL,uid VARCHAR(30) UNIQUE,skills VARCHAR[],years_experience INT CHECK (years_experience >= 0),PRIMARY KEY (tid),FOREIGN KEY (uid) REFERENCES Users(uid) ON DELETE CASCADE)";

   const imagesTable =
      "CREATE TABLE IF NOT EXISTS Images (image_id SERIAL,title VARCHAR(255),data BYTEA,PRIMARY KEY (image_id))";

   const jobsTable =
      "CREATE TABLE IF NOT EXISTS Jobs (jid SERIAL,uid VARCHAR(30),trade_type VARCHAR(255),postal_code VARCHAR(12),description TEXT,date DATE,image INT,PRIMARY KEY (jid, uid),FOREIGN KEY (uid) REFERENCES Users(uid) ON DELETE CASCADE,FOREIGN KEY (image) REFERENCES Images(image_id) ON DELETE CASCADE)";

   await pool.query(usersTable);
   await pool.query(tradieTable);
   await pool.query(imagesTable);
   await pool.query(jobsTable);
}

// Initialize the database and start the server
async function initDatabaseAndStartServer() {
   try {
      await init();
      await sample.initSampleData();
      app.listen(PORT, "0.0.0.0", () => {
         console.log(`App listening at http://localhost:${PORT}`);
      });
   } catch (err) {
      console.error("Failed to initialize the database & start the server:", err);
   }
}

initDatabaseAndStartServer();
