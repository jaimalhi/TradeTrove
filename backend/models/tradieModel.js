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
  const tradie =
    "INSERT INTO tradies(uid,skills,years_experience) VALUES($1,$2,$3)";
  const uidAdded = await pool.query(q, [
    uid,
    email,
    password,
    name,
    "DEFAULT LAST NAME",
    isTradesperson,
  ]);
  await pool.query(tradie, [uidAdded.rows[0].uid, ["DEFAULT SKILLS"], 5])
  console.log(uidAdded.rows[0]);
  console.log("Finishes adding in tradie")
  return uidAdded.rows[0].uid;
}
async function getJobs() {
  const res = await pool.query("SELECT * FROM Jobs");
  const jobs = res.rows;
  return jobs;
}
async function addJob(jobDetails) {
  const {
    uid,
    trade_type,
    location,
    description
  } = jobDetails;


  try {

    const query = 'INSERT INTO Jobs (uid, trade_type, location, description) VALUES($1, $2, $3, $4) RETURNING jid;';
    const values = [uid, trade_type, location, description];
    const res = await pool.query(query, values);
    if (res.rowCount > 0) {
      return true;
    } else {
      throw new Error('Failed to insert into database');
    }

  } catch (err) {
    console.error('Error: ', err);
    return false
  }

}

async function getTradie(uid) {
  const joinUserTradie =
    "SELECT u.first_name,u.last_name,u.email,u.password,t.skills,t.years_experience from users u INNER JOIN tradies t ON u.uid = t.uid WHERE u.uid = $1";
  const res = await pool.query(joinUserTradie, [uid]);
  console.log(res.rows[0]);
  return res.rows[0];
}

async function addSkill(uid, skill) {
  const addSkillInTradie = "UPDATE tradies SET skills= ARRAY_APPEND(skills, $1) WHERE uid = $2"
  const res = await pool.query(addSkillInTradie, [skill, uid])
  return 200;
}

module.exports = {
  getTradies, signUp, getTradie,
  addSkill, getJobs, addJob
};
