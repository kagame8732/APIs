const mongoose = require("mongoose");

const schema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});
module.exports = mongoose.model("User", schema);
