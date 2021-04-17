const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth.js");
const User = require("../models/User.js");

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
router.post("/", [check("email", "please include a valid email").isEmail(),
    check("password", "Password is required").exists()], async (req, res) => {
    
    console.log("get into api auth route");
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

module.exports = router;
