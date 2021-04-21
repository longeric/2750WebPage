const express = require("express");
const router = express.Router();
const User = require("../models/User.js");


router.put("/updateProfile", (req,res) =>{
  const user = {}
  
})


router.post("/createSchdule/:email", (req, res) => {
  console.log(req.params['email'])
  console.log(JSON.stringify(req.body));  
})

module.exports = router;
