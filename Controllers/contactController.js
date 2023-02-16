const Contact = require("../models/Contact");
const Joi = require("@hapi/joi");

//Creating new contact

let message_create = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.message);
  }
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  await contact.save();
  res.send({ message: "Message added successful" });
};
//Get individual message
let message_detail = async (req, res) => {
  const contact = await Contact.findById({ _id: req.params.id });
  res.send(contact);
};
// Get all Messages
let message_details = async (req, res) => {
  const contacts = await Contact.find();
  res.send(contacts);
};
//Delete Message
let message_delete = async (req, res) => {
  try {
    await Contact.deleteOne({ _id: req.params.id });
    res.status(204).send({ Message: "Message deleted successfully" });
  } catch {
    res.status(404);
    res.send({ error: "Message doesn't exist" });
  }
};

module.exports = {
  message_create,
  message_detail,
  message_details,
  message_delete,
};
