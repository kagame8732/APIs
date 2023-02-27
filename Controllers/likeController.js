const Like = require("../models/Like");
const Blog = require("../models/Blog");

const createLike = async (req, res) => {
  const Id = req.params.id;
  const like = new Like({
    BlogId: Id,
  });
  await like.save();
  res.status(201).json({ like: like });
  const likeCommented = await Blog.findById(Id);
  likeCommented.like.push(like);
  await likeCommented.save();
};

const getLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById({ _id: req.params.id });
    res.status(200).json({ numberOfLikes: blog.like.length });
  } catch (err) {
    res.status(500).json({ message: "Check your blog Id again" });
  }
};
module.exports = { createLike, getLike };
