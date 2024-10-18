const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Checking if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Checking if password is correct
  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generating JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};
