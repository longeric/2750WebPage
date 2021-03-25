const express = require("express");
const AuthorController = require("../controllers/authors.js");

const router = express.Router();

router.get("/", AuthorController.getAuthors);
router.post("/", AuthorController.addAuthor);

module.exports = router;
