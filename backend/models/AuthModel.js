//* Handles the database queries for the customer view of the frontend
const pool = require("../database");

//* ======================= EXPORTED =======================
async function login(token) {
   const getUser = "SELECT tradie FROM Users WHERE uid=$1";
   const user = await pool.query(getUser, [token]);
   // return the boolean tradie value
   return user.rows[0].tradie;
}

module.exports = {
   login,
};
