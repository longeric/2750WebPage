const passport = require('passport');
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.login = async (req, res) => {
  // const { email, password } = req.body;
  console.log(req.body);
  
  res.send({ token: "test123" });

//   try {
//     const oldUser = await User.findOne({ email });

//     if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

//     const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

//     if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

//     res.status(200).json({ result: oldUser, token });
//   } catch (err) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
};

exports.signup = async (req, res) =>{

  const { username, email, password } = req.body;
  console.log(req.body);
  console.log(req.body.username);
  console.log(email);
  console.log(password);
  
  try {
    const user = await User.findOne({ email });

    if (user) {
        // req.alter("duplicate");
        req.flash("error", "User already exists");
        return res.redirect("/signup");
    }

    const newUser = await User.create({ username: username, email: email, password: password, admin: false });
    // var newUser = new User ({ nickname, email, password });
    // newUser.save();

    const token = jwt.sign( { email: newUser.email, id: newUser._id }, process.env.SECRET, { expiresIn: "1h" } );

    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
  // res.send({ token: "test456" });
}

// exports.auth = () = {
//   passport.authenticate("login", {
//     successRedirect: "/home",
//     failureRedirect: "/",
//     failureFlash: true
//   })
// }