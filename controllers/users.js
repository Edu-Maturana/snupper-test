const User = require("../models/User");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  getUsers,
};
