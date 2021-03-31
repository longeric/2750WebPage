// Code for (de)serializing users and local authentication 
// from Express in Action

const passport = require('passport');
const User = require("./models/user");
const LocalStrategy = require('passport-local').Strategy;


// serializing and deserializing users from the mongodb
module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

// setup the authentication strategy
passport.use("login", new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}, function(err, user){
    if (err) { return done(err)};
    if (!user) {
      return done(null, false, {message: "No user with that username"});
    }
    user.checkPassword(password, function(err, isMatch){
      if (err) { return done(err);}
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: "Invalid password"});
      }
    });
  });
}));