//* Handles the database queries for the tradie view of the frontend
const pool = require("../database");

//* ======================= EXPORTED =======================
async function getTradies() {
  const res = await pool.query("SELECT * FROM users WHERE tradie=true");
  const tradies = res.rows;
  return tradies;
}

//query at SIGN UP to add the tradie to the users table and to the trader table
async function signUp(
  uid,
  email,
  password,
  phoneNumber,
  age,
  gender,
  isTradesperson,
  name
) {
  const q =
    "INSERT into users(uid,email,password,first_name,last_name,tradie) VALUES ($1,$2,$3,$4,$5,$6) RETURNING uid";
    const tradie = "INSERT INTO tradies(uid,skills,years_experience) VALUES($1,$2,$3)"
  const uidAdded = await pool.query(q, [
    uid,
    email,
    password,
    name,
    "DEFAULT LAST NAME",
    isTradesperson,
  ]);
  await pool.query(tradie,[uidAdded.rows[0].uid,["DEFAULT SKILLS"],5]) 
  console.log(uidAdded.rows[0]);
  console.log("FInishes adding in tradie")
  return uidAdded.rows[0].uid;
}

module.exports = {
  getTradies,signUp
};
