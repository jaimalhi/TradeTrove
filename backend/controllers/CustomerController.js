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

module.exports = router;
