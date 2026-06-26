const Message = require("../models/message.model");

exports.sendMessage = async (req, res) => {
  const saved = await new Message(req.body).save();
  res.json(saved);
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find({ complaintId: req.params.complaintId }).sort("-createdAt");
  res.json(messages);
};