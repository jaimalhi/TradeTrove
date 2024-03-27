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
async function signUp(uid, email, password,first_name, last_name, phoneNumber, isTradesperson) {
   const q =
      "INSERT into users(uid,email,password,first_name,last_name, phone_num, tradie) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING uid";
   const uidAdded = await pool.query(q, [
      uid,
      email,
      password,
      first_name,
      last_name,
      phoneNumber,
      isTradesperson
   ]);
   console.log(uidAdded.rows[0]);
   return uidAdded.rows[0].uid;
}

//add job to jobs table
async function createJob(uid, trade_type, postalCode, description, date, title, imageData) {
   // insert image into images table and get image_id
   //convert string to binary representation
   const imageQuery =
     "INSERT INTO images(title, data) VALUES ($1,decode($2, 'base64')) RETURNING image_id";
   const image64split = imageData.split(";base64,").pop();  //imageData is a base64 string 
   const imageId = await pool.query(imageQuery, [title, image64split]);

   // insert all into jobs table
   const q =
      "INSERT INTO jobs(uid, trade_type, postal_code, description, date, image) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
   const job = await pool.query(q, [
      uid,
      trade_type,
      postalCode,
      description,
      date,
      imageId.rows[0].image_id,
   ]);

   return job.rows[0];
}

module.exports = {
   getCustomers,
   getCustomerJobs,
   signUp,
   createJob,
};
