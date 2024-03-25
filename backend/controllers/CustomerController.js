//* Handles API endpoints for the customer view of the frontend
const express = require("express");
const router = express.Router();
const db = require("../models/CustomerModel");

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

// Get all jobs for customers (tradie=false)
router.get("/jobs", async (req, res) => {
   try {
      const jobs = await db.getCustomerJobs();
      res.json(jobs);
   } catch (err) {
      console.error("Error getting customer jobs:", err);
      res.status(500).send("Internal Server Error");
   }
});

// create job as a customer
router.post("/create-job", async (req, res) => {
   const { uid, trade_type, postalCode, description, date, title, imageData } = req.body;
   try {
      const job = await db.createJob(
         uid,
         trade_type,
         postalCode,
         description,
         date,
         title,
         imageData
      );
      res.json(job);
   } catch (err) {
      console.error("Error creating job:", err);
      res.status(500).send("Internal Server Error");
   }
});

router.post("/signup", async (req, res) => {
   const { uid, email } = req.body.data.user;
   const {firstName, lastName, password, phoneNumber,isTradesperson} = req.body.data.form;
   try {
      //! Need to match data to the database schema
      const signUpSuccess = await db.signUp(
       uid,
       email,
       password,
       firstName,
       lastName,
       phoneNumber,
       isTradesperson
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
       res.cookie("loggedIn", true, {
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
