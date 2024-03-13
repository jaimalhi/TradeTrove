//* Handles the database queries for the tradie view of the frontend
const pool = require("../database");

//* ======================= EXPORTED =======================
async function getTradies() {
   const res = await pool.query("SELECT * FROM users WHERE tradie=true");
   const tradies = res.rows;
   return tradies;
}

module.exports = {
   getTradies,
};
