const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User.js");
// const schedule = require("../models/schedule.js");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //see if the user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      //get users gravator

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      //encrypt password
      user.password = await bcrypt.hash(password, salt);

      //return promise
      await user.save();

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

      // console.log(req.body);
      // console.log("SECRET", process.env.SECRET);

      // res.send("User registered");
    } catch (err) {
      //server error
      console.error(err.message);
      res.status(500).send("Server error in api users");
    }
  }
);

router.put("/updateProfile", (req, res) => {
  const user = {};
});

router.post("/createSchdule/:email", (req, res) => {
  const email = req.params["email"];
  const newSchedule = JSON.stringify(req.body);

  const schedule = JSON.parse(newSchedule);
  console.log(email);
  console.log(schedule);

  User.find({ email }, (err, user) => {
    if (err) console.log(err.message);
    else {
      // const schedule = new schedule(newSchedule);

      console.log(user);
      user[0].schedule.push(schedule);
      user[0].save();
      res.status(200).send("Update!");
    }
  });
});

router.post("/updateSchdule/:email", (req, res) => {
  const email = req.params["email"];
  const newSchedule = JSON.stringify(req.body);

  const schedule = JSON.parse(newSchedule);
  // console.log(email)
  console.log("in")
  console.log(schedule);

  User.findOneAndUpdate(
    { email: email, "schedule._id": schedule._id },
    {
      $set: {
        "schedule.$": schedule
      }
    },
    (err, doc) => {
      if (err) console.log(err.message);
      // else console.log(doc);
    }
  );
});

router.post("/deleteSchdule/:email", (req, res) => {
  const email = req.params["email"];
  const newSchedule = JSON.stringify(req.body);

  const schedule = JSON.parse(newSchedule);
  // console.log(email)
  console.log(schedule);

  User.findOneAndUpdate(
    { email: email },
    {
      $pull: {
        schedule: {
          _id: schedule._id
        }
      }
    },
    (err, doc) => {
      if (err) console.log(err.message);
      else console.log(doc);
    });
});

router.get("/readNote/:email", (req, res) =>{
  let email = req.params['email'];

  User.find({email}, (err, user) =>{
    if(err) console.log(err.message);
    else {
      console.log(user);
      res.json(user[0]);
    }
  })
});

router.put("/saveNote/:email", (req,res) =>{
  const body = req.body;
  const email = req.params['email'];
  const newjson = req.body;
  console.log(newjson)

  User.find({ email }, (err, user) => {
    if (err) console.log(err.message);
    else {
      // const schedule = new schedule(newSchedule);
      // console.log(user);
      // user[0].unschedule = body.unschedule;
      // user[0].save();
      // res.status(200).send("You update sticky note!");
      
      User.findOneAndUpdate(
    { email: email},
    {
      $set: {
        "unschedule.$": newjson
      }
    },
    (err, doc) => {
      if (err) console.log(err.message);
      // else console.log(doc);
    }
  );
    }
  });
});

module.exports = router;
