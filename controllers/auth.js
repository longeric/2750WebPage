const passport = require('passport');
const User = require("../models/user.js");

exports.login = (req, res) =>{
  passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
})
}

exports.signup = (req, res) =>{
  
}