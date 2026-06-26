const User = require("../models/user.model");

// Admin: Get all agents
exports.getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "Agent" });
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Admin: Get all ordinary users
exports.getOrdinaryUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "Ordinary" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Admin: Get Agent by Id
exports.getAgentById = async (req, res) => {
  try {
    const user = await User.findById(req.params.agentId);
    if (!user || user.role !== "Agent") {
      return res.status(404).json({ error: "Agent not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Admin: Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await User.deleteOne({ _id: req.params.id });
    await require("../models/complaint.model").deleteMany({ userId: req.params.id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Admin: Update user
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(updated ? 200 : 404).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the user" });
  }
};