//* Handles API endpoints for the tradie view of the frontend
const express = require("express");
const router = express.Router();
const db = require("../models/tradieModel");
const axios = require("axios");

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

// Get all jobs for tradies (tradie=false)
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await db.getTradieJobs();
    var pincodes = jobs.map((job) => job.postal_code);
    var pincodeCityDict = {};
    const apiEndpoint = process.env.zipcodeEndpoint;
    const apikey = process.env.zipcodeApikey;

    const codesParam = pincodes.join(",");
    const apiRes = await axios.get(apiEndpoint, {
      params: {
        apikey: apikey,
        codes: codesParam,
      },
    });

    for (const pincode in apiRes.data.results) {
      const arr = apiRes.data.results[pincode];
      pincodeCityDict[pincode] = arr[0].city
    }
    
    toSend = {
       jobs:jobs,
       pincodeCityDict: pincodeCityDict
    }
    res.json(toSend);
  } catch (err) {
    console.error("Error getting tradie jobs:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Sign up tradie
router.post("/signup", async (req, res) => {
  console.log(req.body.data.form);
  const { uid, email } = req.body.data.user;
  const {
    firstName,
    lastName,
    password,
    phoneNumber,
    isTradesperson,
    yearsOfExperience,
    skills,
  } = req.body.data.form;

  try {
    //! Need to match data to the database schema
    const signUpSuccess = await db.signUp(
      uid,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      isTradesperson,
      yearsOfExperience,
      skills
    );
    console.log(
      "Sign up query for tradie finished successfully",
      signUpSuccess
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.cookie("uid", uid, {
      httpOnly: false,
      path: "/",
    });
    res.cookie("isTradie", true, {
      httpOnly: true,
      path: "/",
    });
    res.cookie("loggedIn", true, {
      httpOnly: false,
      path: "/",
    });
    res.json(signUpSuccess);
  } catch (err) {
    console.error("Error signing in", err);
    res.status(500).send("Internal Server Error");
  }
});

//Get tradie with uid
router.get("/getTradieInfo", async (req, res) => {
  try {
    const cookieUid = req.cookies.uid;
    console.log("cookieUid", cookieUid);
    const getTradie = await db.getTradie(cookieUid);
    res.json(getTradie);
  } catch {
    console.error("Error signing in", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addSkill", async (req, res) => {
  const cookieUid = req.cookies.uid;
  console.log("cookieUid", cookieUid);
  const addSkill = await db.addSkill(cookieUid, req.body.data);
  res.send(addSkill);
});

// router.get("/jobs", async (req, res) => {
//    try {
//       const jobs = await db.getJobs();
//       res.json(jobs);
//    } catch (err) {
//       console.error("Error getting tradies:", err);
//       res.status(500).send("Internal Server Error");
//    }
// })
// TODO: DO WE NEED IT?
// router.post("/jobs", async (req, res) => {
//    const jobDetails = req.body;
//    if (!jobDetails) {
//       res.status(403).send('BAD REQUEST')
//       return
//    }
//    try {
//       const confirmAdded = await db.addJob(jobDetails);
//       if (!confirmAdded) {
//          res.status(403).send('BAD REQUEST, Wrong user')
//          return
//       }
//       res.sendStatus(200);
//    } catch (err) {
//       console.error("Error getting tradies:", err);
//       res.status(500).send("Internal Server Error");
//    }
// })
// TODO: DO WE NEED IT?

module.exports = router;
