const express = require("express");
const router = express.Router();
const User = require("../models/User.js");


router.put("/updateProfile", (req,res) =>{
  const user = {}
  
})


router.post("/createSchdule", (req, res) => {
  console.log(req.body);  
})

module.exports = router;
