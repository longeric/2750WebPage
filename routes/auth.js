const express = require("express");
const AuthController = require("../controllers/auth.js");

const router = express.Router();

// // Make user information available to templates
// router.use(function(req, res, next) {
//   res.locals.currentUser = req.user;
//   res.locals.errors = req.flash("error");
//   res.locals.infos = req.flash("info");
//   next();
// });

// router.post("/", passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/signup',
//                                    failureFlash: true);
// router.post("/", AuthController.signup);
router.get("/users", (req, res) => res.send("asdc"));

module.exports = router;