const express = require("express");
// const AuthorController = require("../controllers/food.js");

const router = express.Router();
const foodapi = process.env.API_KEY;

router.get("/", (req, res)=>{
  res.json()
});
// router.post("/", AuthorController.addAuthor);

module.exports = router;