const mongoose = require("mongoose");

const schemaComment = mongoose.Schema({
  name: String,
  message: String,
  // blogId: String,
});

module.exports = mongoose.model("Comment", schemaComment);
