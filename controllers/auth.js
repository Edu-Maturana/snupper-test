const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Verify if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // Encrypt password
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(password, salt);

  // Save user
  await user.save();

  // Response
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
};

module.exports = {
  signup,
};
