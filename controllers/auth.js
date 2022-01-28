const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt-auth");

const signup = async (req = request, res = response) => {
  const { name, email, password } = req.body;

  // Verify if user exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // Encrypt password
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  // Create user
  const newUser = new User({
    name,
    email,
    password: hash,
  });

  // Save user
  await newUser.save();

  // Response
  res.json({
    msg: "User created successfully",
    newUser,
  });
};

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  // Verify if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  // Verify if password is correct
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid data" });
  }

  // Generate JWT
  const token = await generateJWT(user);

  // Response
  res.json({
    msg: "Logged in successfully",
    token,
  });
};

module.exports = {
  signup,
  login,
};
