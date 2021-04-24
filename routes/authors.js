const express = require("express");
const AuthorInfo = require("../models/authorsInfo.js");

const router = express.Router();

router.get("/", (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  try {
    const sort = { _id: -1 };
    const developer = AuthorInfo.find().sort(sort);
    res.status(200).json(developer);
  } catch (error) {
    res.status(404).json(error.message);
  }
});
           
router.post("/", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;

  const newAuthorInfo = new AuthorInfo({
    name,
    email
  });

  newAuthorInfo
    .save()
    .then(() => res.status(201).json("Add Successfully"))
    .catch(error => res.status(409).json(error.message));
});


module.exports = router;
