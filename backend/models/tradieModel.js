//* Handles the database queries for the tradie view of the frontend
const pool = require("../database");

//* ======================= EXPORTED =======================
async function getTradies() {
   const res = await pool.query(`
     SELECT 
       Users.uid, 
       Users.email, 
       Users.first_name, 
       Users.last_name, 
       Users.phone_num, 
       Tradies.skills, 
       Tradies.years_experience 
     FROM 
       Users 
     INNER JOIN 
       Tradies 
     ON 
       Users.uid = Tradies.uid 
     WHERE 
       Users.tradie = true
   `);
   const tradies = res.rows;
 
   return tradies;
 }
 
//query at SIGN UP to add the tradie to the users table and to the trader table
async function signUp(
   uid,
   email,
   password,
   first_name,
   last_name,
   phoneNumber,
   isTradesperson,
   year_experience,
   skills
 
 ) {
  
   const q =
     "INSERT into users(uid,email,password,first_name,last_name,phone_num,tradie) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING uid";
   const tradie =
     "INSERT INTO tradies(uid,skills,years_experience) VALUES($1,$2,$3)";
   const uidAdded = await pool.query(q, [
     uid,
     email,
     password,
     first_name,
     last_name,
     phoneNumber,
     isTradesperson
   ]);
 
   const skillsArray = skills.split(',').map(skill => skill.trim()); 
   const skillsPgArray = `{${skillsArray.join(',')}}`;
   await pool.query(tradie, [uidAdded.rows[0].uid, skillsPgArray, year_experience]);
   console.log(uidAdded.rows[0]);
   console.log("FInishes adding in tradie");
   return uidAdded.rows[0].uid;
 }

async function getTradie(uid) {
   const joinUserTradie =
      "SELECT u.first_name,u.last_name,u.email,u.password,t.skills,t.years_experience from users u INNER JOIN tradies t ON u.uid = t.uid WHERE u.uid = $1";
   const res = await pool.query(joinUserTradie, [uid]);
   console.log(res.rows[0]);
   return res.rows[0];
}

async function addSkill(uid, skill) {
   const addSkillInTradie = "UPDATE tradies SET skills= ARRAY_APPEND(skills, $1) WHERE uid = $2";
   const res = await pool.query(addSkillInTradie, [skill, uid]);
   return 200;
}

async function getTradieJobs() {
   const res = await pool.query(
      "SELECT jobs.* FROM jobs, users WHERE users.tradie=true AND users.uid=jobs.uid"
   );
   const jobs = res.rows;
   return jobs;
}

module.exports = {
   getTradies,
   signUp,
   getTradie,
   addSkill,
   getTradieJobs,
};
