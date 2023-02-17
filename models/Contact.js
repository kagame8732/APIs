const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
  },
  message: String,
});

module.exports = mongoose.model("Contact", schema);
