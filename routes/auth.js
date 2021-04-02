const express = require("express");
const AuthController = require("../controllers/auth.js");

const router = express.Router();

// Make user information available to templates
router.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});

router.post("/", AuthController.login);
// router.post("/", AuthController.signup);

module.exports = router;