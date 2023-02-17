const Blog = require("../models/Blog");
const Joi = require("@hapi/joi");

// Blog creation
let blog_create = async (req, res) => {
  const schema = Joi.object({
    image: Joi.string(),
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const blog = new Blog({
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
  });
  await blog.save();
  // res.status(201).send({ message: "Blog added successfully " });
  res.status(201).send(blog);
};
// Get all Blog
let blog_details = async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).send(blogs);
};
let blog_detail = async (req, res) => {
  const blog = await Blog.findById({ _id: req.params.id });
  res.status(201).send(blog);
};
//Update Blog
let blog_update = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    if (req.body.image) {
      blog.image = req.body.image;
    }
    if (req.body.title) {
      blog.title = req.body.title;
    }
    if (req.body.description) {
      blog.description = req.body.description;
    }
    await blog.save();
    // res.status(200).send({ message: "Blog updated successfully" });
    res.status(200).send(blog);
  } catch {
    res.status(404).send({ message: "Blog doesn't exist" });
  }
};
//|Delete a blog
let blog_delete = async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id });
    // await Blog.deleteMany();

    res.json({ Message: "Blog delete successfully" });
    // res.status(201).send(Blog);
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist" });
  }
};
module.exports = {
  blog_create,
  blog_detail,
  blog_details,
  blog_update,
  blog_delete,
};
