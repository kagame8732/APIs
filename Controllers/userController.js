const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");

const SECRET_KEY = "kalex secret";

const signup = async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { firstName, lastName, email, password } = value;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully" });
    // res.status(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
//Get all users
let signup_details = async (req, res) => {
  const user = await userModel.find();
  res.status(200).send(user);
};
//Get single user

let signup_detail = async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  res.send(user);
};
//Delete a user

let signup_delete = async (req, res) => {
  try {
    await userModel.deleteOne({ _id: req.params.id });
    res.status(201).send({ message: "user deleted successfully" });
  } catch (err) {
    res.status(404).send(err);
  }
};

//Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "Email not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Incorrect password " });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res
      .status(201)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {}
};

//Router Protection
// const protectRoute = (req, res, next) => {
//   const token = req.header("Authorization").split(" ")[1];
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Access denied, no token provided" });
//   }
//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// };
const protectRoute = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = {
  signup,
  signup_detail,
  signup_details,
  login,
  signup_delete,
  protectRoute,
};
