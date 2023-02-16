const mongoose = require("mongoose");

const schema = mongoose.Schema({
  image: String,
  title: String,
  description: String,
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "likes",
    },
  ],
});

module.exports = mongoose.model("Blogs", schema);
