//* Handles database queries for the all users methods
const pool = require("../database");
const fs = require("fs");

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
    //convert from binary to base64 string
    const imageRes = await pool.query(
      "SELECT image_id,title, encode(data,'base64') FROM images WHERE image_id=$1",
      [imageId]
    );
    res.rows[i].imageData = imageRes.rows[0].encode;
    res.rows[i].imageTitle = imageRes.rows[0].title;
  }

  return res.rows;
}

module.exports = {
  getUserById,
  getJobsByUserId,
};
