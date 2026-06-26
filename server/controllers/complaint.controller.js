const Complaint = require("../models/complaint.model");
const AssignedComplaint = require("../models/assignedComplaint.model");
const User = require("../models/user.model");

exports.registerComplaint = async (req, res) => {
  try {
    const userId = req.params.id;
    const body = req.body;

    console.log("✅ Incoming Complaint Payload:", body);
    console.log("✅ User ID from URL:", userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log("❌ No user found with this ID");
      return res.status(404).json({ error: "User not found" });
    }

    if (!body.userId) body.userId = userId;

    const complaint = new Complaint(body);

    console.log("✅ Attempting to save complaint...");
    const saved = await complaint.save();
    console.log("✅ Complaint saved successfully:", saved);

    res.status(200).json(saved);
  } catch (error) {
    console.error("🔥 Complaint Save Error:", error); // Show full error stack
    res.status(500).json({ error: "Failed to register complaint", details: error.message });
  }
};

exports.getUserComplaints = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    const complaints = await Complaint.find({ userId: req.params.id });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve complaints" });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve complaints" });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(complaintId, { status }, { new: true });
    await AssignedComplaint.findOneAndUpdate({ complaintId }, { status }, { new: true });
    res.status(updatedComplaint ? 200 : 404).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to update complaint" });
  }
};

exports.getAgentComplaints = async (req, res) => {
  const agentId = req.params.id;

  try {
    const complaints = await AssignedComplaint.find({ agentId })
      .populate("complaintId"); // make sure complaintId exists in DB

    const formatted = complaints
      .filter(c => c.complaintId) // remove entries where complaintId is missing
      .map(c => ({
        complaintId: c.complaintId._id,
        name: c.complaintId.name,
        address: c.complaintId.address,
        city: c.complaintId.city,
        state: c.complaintId.state,
        pincode: c.complaintId.pincode,
        comment: c.complaintId.comment,
        status: c.complaintId.status
      }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching complaints for agent', error: err });
  }
};