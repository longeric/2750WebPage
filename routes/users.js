const express = require("express");
const router = express.Router();
const User = require("../models/User.js");


router.put("/updateProfile", (req,res) =>{
  const user = {}
  
})


router.post("/createSchdule/:email", (req, res) => {
  const email = req.params['email'];
  const newSchedule = JSON.stringify(req.body);  
  
  User.find({email}, (err, user) =>{
    if(err) console.log(err.message);
    else {
      console.log(user);
      user[0].schedule.push(newSchedule);
      user[0].save();
      res.status(200).send("Update!");
    }
  })
})

module.exports = router;
