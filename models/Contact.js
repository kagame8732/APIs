const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  message: String,
});

module.exports = mongoose.model("Contact", schema);
