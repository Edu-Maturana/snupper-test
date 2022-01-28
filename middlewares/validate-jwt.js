const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req = request, res = response, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ msg: "User not authenticated" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(authHeader, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }

  if (!decodedToken) {
    return res.status(401).json({ msg: "Token is not valid" });
  }

  req.user = decodedToken;
  next();
};

module.exports = validateJWT;
