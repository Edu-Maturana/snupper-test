const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, ...user } = this.toObject();
  return user;
};

module.exports = mongoose.models["User"]
  ? mongoose.model("User")
  : mongoose.model("User", UserSchema);
