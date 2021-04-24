const express = require("express");
const router = express.Router();
const User = require("../models/User.js");


router.get("/All", async (req,res) =>{
  
  try {
    const user = await User.find({});
    res.json(user);
  } catch (err) {
    console.log("errors: ", err.message);
    res.status(500).send("Server Error in auth");
  }
  
})



module.exports = router;