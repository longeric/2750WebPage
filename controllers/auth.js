const passport = require('passport');
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

exports.signup = (req, res) =>{

    var nickname = req.body.nickname;
    var password = req.body.password;

    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return next(err);
      }
      if (user) {
        req.flash("error", "User already exists");
        return res.redirect("/signup");
      }
      var newUser = new User({
        nickname: nickname,
        password: password,
        token: ""
      });
      console.log(username);
      newUser.save(next);
    });
  
    res.send({ token: "test123" });
  
}

exports.auth = () = {
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: true
  })
}