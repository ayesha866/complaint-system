const express = require("express");
const router = express.Router();
const {
  registerComplaint,
  getUserComplaints,
  getAllComplaints,
  updateComplaint,
  getAgentComplaints
} = require("../controllers/complaint.controller");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Ordinary User: file complaint
router.post("/:id", protect, registerComplaint);

// Agent: complaints assigned to them
router.get("/allcomplaints/:id", getAgentComplaints);

// Ordinary User: their complaint status
router.get("/status/:id", protect, authorizeRoles("Ordinary"), getUserComplaints);

// Admin: all complaints
router.get("/all", protect, authorizeRoles("Admin"), getAllComplaints);

// Admin or Agent: update complaint status
router.put("/:complaintId",  updateComplaint);

module.exports = router;
