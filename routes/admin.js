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

router.delete("/delete/:email", (req,res) =>{
  let email = req.params['email'];
  console.log(email)
    User.findOne({email:email}, (err, user) =>{
      if(err) res.status(500).send("Server Error in auth");
      else {
        console.log(user)
        user.remove(function(err) {
          if (err) {
            res.status(500).send(err.message);
          } else {
            res.status(204).send("removed");
          }
        });
      }
    });
})

// router.get("/userChart", async (req, res) => {
//   var d = new Date();
//   d.setDate(d.getDate()-2);
//   var query = User.aggregate([
//           { "$match": {date: {$gt: d}}},
          
//           {"$group": {
//                "_id": { yearMonthDayUTC: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }},
//               number: { $sum: 1},
//           }},
//           { "$sort": { count: -1 } },
//      ]); 
//    query.exec((err, crimes) =>{
//         if(err) console.log(err.message);
//         res.json(crimes)
//    });
// })



module.exports = router;