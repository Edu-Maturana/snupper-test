const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const validateJWT = (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "User not authenticated",
    });
  }

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findById(_id);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = validateJWT;
