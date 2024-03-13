//* Handles the database queries for the customer view of the frontend
const pool = require("../database");

//* ======================= EXPORTED =======================
async function getCustomers() {
   const res = await pool.query("SELECT * FROM users WHERE tradie=false");
   const customers = res.rows;
   return customers;
}

module.exports = {
   getCustomers,
};
