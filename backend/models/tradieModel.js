//* Handles the database queries for the tradie view of the frontend
const pool = require("../database");

//* ======================= EXPORTED =======================
async function getTradies() {
   const res = await pool.query("SELECT * FROM users WHERE tradie=true");
   const tradies = res.rows;
   return tradies;
}

//query at SIGN UP to add the tradie to the users table and to the trader table
async function signUpTradie(req) {
   // app.put("/login", (req, res) => {
   //   console.log(req.body);
   //   console.log("Authentication done: \n");
   //   res.send({ access_token: `${req.body}` }); //add it to the DB
   // });
   console.log(req.form);
   const addToUser = `INSERT `
}

module.exports = {
   getTradies,
};
