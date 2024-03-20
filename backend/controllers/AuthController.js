//* Handles API endpoints for the customer view of the frontend
const express = require("express");
const router = express.Router();
const db = require("../models/AuthModel");

//! ALL ENDPOINTS PREFIXED WITH /api/auth AS DEFINED IN index.js

router.post("/login", async (req, res) => {
   // console.log("i am trying to sign in");
   const token = req.body.data.token;
   // console.log(req.body.token);

   try {
      const isTradie = await db.login(token);
      res.header("Access-Control-Allow-Credentials", "true"); 
      res.cookie("uid", token, {
        httpOnly: false,
        path: "/",
      });
      res.cookie("isTradie", isTradie, {
        httpOnly: false,
        path: "/",
      });
      res.cookie("loggedIn", true, {
        httpOnly: false,
        path: "/",
      });
      res.status(200).json(isTradie);
      // res.send("cookie");
   } catch (err) {
      console.error("Error getting tradie status:", err);
      res.status(500).send("Internal Server Error");
   }
});

module.exports = router;
