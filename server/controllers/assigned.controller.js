const AssignedComplaint = require("../models/assignedComplaint.model");

exports.assignComplaint = async (req, res) => {
  try {
    const existing = await AssignedComplaint.findOne({
      complaintId: req.body.complaintId
    });

    if (existing) {
      return res.status(400).json({
        error: "Complaint already assigned"
      });
    }

    await AssignedComplaint.create(req.body);
    res.sendStatus(201);

  } catch (error) {
    res.status(500).json({
      error: "Failed to assign complaint"
    });
  }
};

// project-root/controllers/messageController.js
const Message = require("../models/message.model");

exports.sendMessage = async (req, res) => {
  try {
    const msg = new Message(req.body);
    const saved = await msg.save();
    res.status(200).json(saved);
  } catch {
    res.status(500).json({
      error: "Failed to send message"
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      complaintId: req.params.complaintId
    }).sort("-createdAt");

    res.status(200).json(messages);
  } catch {
    res.status(500).json({
      error: "Failed to retrieve messages"
    });
  }
};