//* Handles database queries for the all users methods
const pool = require("../database");

async function getUserById(uid) {
   const res = await pool.query("SELECT * FROM users WHERE uid=$1", [uid]);
   return res.rows[0];
}

async function getJobsByUserId(uid) {
   // get jobs by id
   const res = await pool.query("SELECT * FROM jobs WHERE uid=$1", [uid]);

   // using image_id to get image data from images table
   for (let i = 0; i < res.rows.length; i++) {
      const imageId = res.rows[i].image;
      const imageRes = await pool.query("SELECT * FROM images WHERE image_id=$1", [imageId]);
      res.rows[i].imageData = imageRes.rows[0].data;
      res.rows[i].imageTitle = imageRes.rows[0].title;
   }

   return res.rows;
}

module.exports = {
   getUserById,
   getJobsByUserId,
};
