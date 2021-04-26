const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.js");
const User = require("../models/User.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log("errors: ", err.message);
    res.status(500).send("Server Error in auth");
  }
});

//route: POST api/auth
//authtication user and get the token
router.post(
  "/",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    // console.log("get into api auth route");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //see if the user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: "User is not exist" }] });
      }

      // is match - password is wrong

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid password" }] });
      }

      //return json web token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      //server error
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);



router.get("/readUser/:email", (req, res) => {
  let email = req.params["email"];
  // console.log(email);
  User.find({ email }, (err, user) => {
    if (err) console.log(err.message);
    else {
      // console.log(user);
      res.json(user[0]);
    }
  });
});

router.put("/updateProfile", (req, res) => {
  const body = req.body;
  const email = body.email;

  User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        name: body.name
      }
    },
    (err, doc) => {
      if (err) console.log(err.message);
      else console.log(doc);
    }
  );
});

router.post("/google", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
  const { email_verified, name, email, picture } = ticket.getPayload();

  console.log("auth route")
  console.log(ticket.getPayload());
  if (email_verified) {
    User.findOne({ email }).exec((err, user) => {
      if (err) res.status(400).json({ errors: err });
      else {
        console.log(user)
        if (user) {
          const payload = {
            user: {
              id: user.id
            }
          };

          jwt.sign(
            payload,
            process.env.SECRET,
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              console.log(token)
              console.log(email)
              res.json({ token, email });
            }
          );
        } else {
          console.log("register")
          let password = email + process.env.SECRET;
          let newUser = new User({ email, name, password });
          newUser.save((err, data) => {
            if (err) {
              res.status(400).json({ error: "wrong??" });
            }
          });
        }
      }
    });
  }
  // res.status(201);
  // res.json(user)
});

// test
router.post("/adduser", (req, res) => {
  console.log(req.body);

  try {
    const newUser = User.create(req.body);
    console.log("add");
  } catch (err) {
    console.log(err.message);
  }
});

// test
router.get("/:email", (req, res) => {
  let email = req.params["email"];
  // console.log(email);
  User.find({ email }, (err, user) => {
    if (err) console.log(err.message);
    else {
      // console.log(user);
      res.json(user[0].schedule);
    }
  });
});

module.exports = router;
