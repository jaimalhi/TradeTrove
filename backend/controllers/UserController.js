//* Handles API endpoints for the all users methods
const express = require("express");
const router = express.Router();
const db = require("../models/UserModel");

//! ALL ENDPOINTS PREFIXED WITH /api/users AS DEFINED IN index.js

// Get a user by their uid
router.get("/:uid", async (req, res) => {
   const { uid } = req.params;
   try {
      const user = await db.getUserById(uid);
      if (!user) {
         res.status(404).send("User not found");
         return;
      }
      res.json(user);
   } catch (err) {
      console.error("Error getting user by id:", err);
      res.status(500).send("Internal Server Error");
   }
});

module.exports = router;
