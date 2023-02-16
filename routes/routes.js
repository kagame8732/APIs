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
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: "damoif3ob",
//   api_key: "642845615319414",
//   api_secret: "B0wd_NQcJBlze0ZOaq2U48tuKE8",
// });
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "DEV",
//   },
// });
// const upload = multer({ storage: storage });
//Blog
router.post("/blogs", protectRoute, blogController.blog_create);
router.get("/blogs/:id", blogController.blog_detail);
router.get("/blogs", blogController.blog_details);
router.patch("/blogs/:id", protectRoute, blogController.blog_update);
router.delete("/blogs/:id", protectRoute, blogController.blog_delete);
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
