const express = require("express");
const blogController = require("../Controllers/blogController");
const contactController = require("../Controllers/contactController");
const router = express.Router();
const { createLike, getLike } = require("../Controllers/likeController");
const {
  createComment,
  getComment,
} = require("../Controllers/commentController");
const {
  signup,
  signup_detail,
  signup_details,
  signup_delete,
  login,
  protectRoute,
} = require("../Controllers/userController");

//Blog
router.post("/blogs", blogController.blog_create);
router.get("/blogs/:id", blogController.blog_detail);
router.get("/blogs", blogController.blog_details);
router.patch("/blogs/:id", protectRoute, blogController.blog_update);
router.delete("/blogs/:id", blogController.blog_delete);
//Blog Comment
router.post("/blogs/comments/:id", createComment);
router.get("/blogs/comments/:id", getComment);
//Blog Like
router.post("/blogs/likes/:id", createLike);
router.get("/blogs/likes/:id", getLike);
//Message
router.post("/contacts", contactController.message_create);
router.get("/contacts/:id", contactController.message_detail);
router.get("/contacts", contactController.message_details);
router.delete("/contacts/:id", protectRoute, contactController.message_delete);
//User
router.post("/signup", signup);
router.get("/signup/:id", protectRoute, signup_detail);
router.get("/signup", protectRoute, signup_details);
router.delete("/signup/:id", protectRoute, signup_delete);
router.post("/login", login);

module.exports = router;
