const express = require("express");
const axios = require('axios');
// const AuthorController = require("../controllers/food.js");

const router = express.Router();
const foodapi = process.env.API_KEY;

router.get("/", (req, res)=>{
  var url = 'https://api.edamam.com/api/food-database/v2/parser?ingr=red%20apple' + foodapi;
  
  console.log(url);
  // axios.get(url)
  //   .then(response => {
  //     if (!response.data.hints.length) {
  //       return res.send({
  //         error: 'No food found'
  //       })
  //     }
  //     res.send(JSON.stringify(response.data.hints))
  //   })
  //   .catch(error => res.sendStatus(error.response.status))
});


module.exports = router;