//* Handles the database queries for the customer view of the frontend
const pool = require("../database");

//* ======================= EXPORTED =======================
async function getCustomers() {
   const res = await pool.query("SELECT * FROM users WHERE tradie=false");
   const customers = res.rows;
   return customers;
}

async function getCustomerJobs() {
   const res = await pool.query(
      "SELECT jobs.* FROM jobs, users WHERE users.tradie=false AND users.uid=jobs.uid"
   );
   const jobs = res.rows;
   return jobs;
}

//add customer to user table
async function signUp(uid, email, password, phoneNumber, age, gender, isTradesperson, name) {
   const q =
      "INSERT into users(uid,email,password,first_name,last_name,tradie) VALUES ($1,$2,$3,$4,$5,$6) RETURNING uid";
   const uidAdded = await pool.query(q, [
      uid,
      email,
      password,
      name,
      "DEFAULT LAST NAME",
      isTradesperson,
   ]);
   console.log(uidAdded.rows[0]);
   return uidAdded.rows[0].uid;
}

module.exports = {
   getCustomers,
   getCustomerJobs,
   signUp,
};
