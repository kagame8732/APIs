const Comment = require("../models/Comment");
const Blog = require("../models/Blog");
const Joi = require("@hapi/joi");

const createComment = async (req, res) => {
  const Id = req.params.id;

  const validationSchema = Joi.object({
    name: Joi.string().required(),
    message: Joi.string().required(),
  });

  const validationResult = validationSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.message });
  }

  const comment = new Comment({
    name: req.body.name,
    message: req.body.message,
    blogId: Id,
  });
  await comment.save();
  res.status(201).json(comment);
  const blogCommented = await Blog.findById(Id);
  blogCommented.comment.push(comment);
  await blogCommented.save();
};

const getComment = async (req, res) => {
  try {
    const blogId = req.params.id;
    const comments = await Comment.find({ blogId });
    const messages = comments.map((comment) => comment.message);
    res.status(200).json({ messages });
  } catch (err) {
    res.status(404).json({ message: "Check again your Blog Id " });
  }
};

module.exports = { createComment, getComment };
