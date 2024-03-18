//* Handles database queries for the all users methods
const pool = require("../database");

async function getUserById(uid) {
   const res = await pool.query("SELECT * FROM users WHERE uid=$1", [uid]);
   return res.rows[0];
}

module.exports = {
   getUserById,
};
