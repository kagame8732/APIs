const mongoose = require("mongoose");

const schemaLike = mongoose.Schema({
  blogId: String,
});

module.exports = mongoose.model("Likes", schemaLike);
