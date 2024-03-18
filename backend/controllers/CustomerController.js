//* Handles API endpoints for the customer view of the frontend
const express = require("express");
const router = express.Router();
const db = require("../models/customerModel");

//! ALL ENDPOINTS PREFIXED WITH /api/customers AS DEFINED IN index.js

// Get all customers (tradie=false)
router.get("/", async (req, res) => {
   try {
      const customers = await db.getCustomers();
      res.json(customers);
   } catch (err) {
      console.error("Error getting customers:", err);
      res.status(500).send("Internal Server Error");
   }
});

router.post("/signup", async (req, res) => {
   const { uid, email } = req.body.data.user;
   const { password, phoneNumber, age, gender, isTradesperson, name } = req.body.data.form;
   try {
      //! Need to match data to the database schema
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
       res.header("Access-Control-Allow-Credentials", "true");
       res.cookie("uid", uid, {
         httpOnly: false,
         path: "/",
       });
       res.cookie("isTradie", false, {
         httpOnly: false,
         path: "/",
       });
      console.log("Sign up query finished successfully", signUpSuccess);
      res.json(signUpSuccess);
   } catch (err) {
      console.error("Error signing in", err);
      res.status(500).send("Internal Server Error");
   }
});

module.exports = router;
