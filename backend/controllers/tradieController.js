//* Handles API endpoints for the tradie view of the frontend
const express = require("express");
const router = express.Router();
const db = require("../models/tradieModel");

//! ALL ENDPOINTS PREFIXED WITH /api/tradies AS DEFINED IN index.js


// Get all customers (tradie=true)
router.get("/", async (req, res) => {
   try {
      const tradies = await db.getTradies();
      res.json(tradies);
   } catch (err) {
      console.error("Error getting tradies:", err);
      res.status(500).send("Internal Server Error");
   }
});

// Sign up tradie
router.post("/signUp", async (req,res) => {
   console.log(req.body.data.form);
   const { uid, email } = req.body.data.user;
   const { password, phoneNumber, age, gender, isTradesperson, name } =
     req.body.data.form;
   try {
     const signUpSuccess = await db.signUp(
       uid,
       email,
       password,
       phoneNumber,
       age,
       gender,
       isTradesperson,
       name
     );
     console.log("Sign up query for tradie finished successfully", signUpSuccess);
     res.json(signUpSuccess);
   } catch (err) {
     console.error("Error signing in", err);
     res.status(500).send("Internal Server Error");
   }
})

module.exports = router;
