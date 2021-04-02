const passport = require('passport');
const User = require("../models/user.js");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  
  res.send({ token: "test123" });
  res.redirect("/home")

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
  
}