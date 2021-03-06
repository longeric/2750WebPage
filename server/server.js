const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const path = require("path");
const authorsRouter = require("../routes/authors.js");
const authRouter = require("../routes/auth.js");
const usersRouter = require("../routes/users.js");
const adminRouter = require("../routes/admin.js");
var GithubStrategy = require('passport-github').Strategy;
const app = express();

// Set up necessary middleware for sessions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// passport.use(new GithubStrategy({
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL: 'https://'+process.env.PROJECT_DOMAIN+'.glitch.me/login/github/return',
// },
// function(token, tokenSecret, profile, cb) {
//   return cb(null, profile);
// }));
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });


const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });


// Using connect-mongo for session storage
// https://www.npmjs.com/package/connect-mongo
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection, autoRemove: 'native' })
}));

// Set up Passport middleware
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github'));

app.get('/login/github/return', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

// PWAs want HTTPS!
function checkHttps(request, response, next) {
  // Check the protocol ?????if http, redirect to https.
  if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    response.redirect("https://" + request.hostname + request.url);
  }
}

app.all("*", checkHttps);

// // A test route to make sure the server is up.
// app.get("/api/ping", (request, response) => {
//   console.log("?????? Received GET request to /api/ping");
//   response.send("pong!");
// });

app.use("/api/author", authorsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/admin", adminRouter);

// Express port-switching logic
let port;
console.log("?????? NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("?????? Not seeing your changes as you develop?");
  console.log(
    "?????? Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("?????? Express server is running on port", listener.address().port);
});