const pool = require("../database");

async function initSampleData() {
   const userExists = await checkUserExists("example_user_uid_1");
   if (!userExists) {
      await sampleTradie();
   }

   const customerExists = await checkUserExists("example_user_uid_2");
   if (!customerExists) {
      await sampleCustomer();
   }
}

async function checkUserExists(uid) {
   const query = "SELECT COUNT(*) FROM Users WHERE uid = $1";
   const result = await pool.query(query, [uid]);
   return result.rows[0].count > 0;
}

async function sampleTradie() {
   const userTable =
      "INSERT INTO Users (uid, email, password, first_name, last_name, phone_num, tradie) VALUES ('example_user_uid_1', 'tradie@example.com', 'password123', 'John', 'Doe', 6042223333, TRUE)";
   await pool.query(userTable);

   const tradieTable =
      "INSERT INTO Tradies (uid, skills, years_experience) VALUES ('example_user_uid_1', ARRAY['plumbing', 'carpentry'], 5)";
   await pool.query(tradieTable);

   const imageTable = "INSERT INTO Images (title, data) VALUES ('tradie image', NULL)";
   await pool.query(imageTable);

   const jobsTable =
      "INSERT INTO Jobs (uid, trade_type, postal_code, description, date, image) VALUES ('example_user_uid_1', 'carpentry', 'V5A1S6', 'Tradie Offering carpentry services', '2024-01-01', 1)";
   await pool.query(jobsTable);
}

async function sampleCustomer() {
   const userTable =
      "INSERT INTO Users (uid, email, password, first_name, last_name, phone_num, tradie) VALUES ('example_user_uid_2','nontradie@example.com', 'password456', 'Jane', 'Smith', 6049998888, FALSE)";
   await pool.query(userTable);

   const imageTable = "INSERT INTO Images (title, data) VALUES ('customer image', NULL)";
   await pool.query(imageTable);

   const jobsTable =
      "INSERT INTO Jobs (uid, trade_type, postal_code, description, date, image) VALUES ('example_user_uid_2', 'plumbing', 'V5A1S6', 'Customer wanting plumbing services', '2024-04-15', 2)";
   await pool.query(jobsTable);
}

module.exports = { initSampleData };
