const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get("/", (req, res)=>{
  console.log("in");
  const url = `https://api.edamam.com/api/food-database/parser?ingr=red%20apple${process.env.API_KEY}`;
  console.log(url);
  axios.get(url)
    .then(response => {
      if (!response.data.hints.length) {
        return res.send({
          error: 'No food found'
        })
      }
      res.send(JSON.stringify(response.data.hints))
    })
    .catch(error => res.sendStatus(error.response.status))
});

module.exports = router;