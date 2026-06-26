const express = require("express");
const router = express.Router();
const {
  getAgents,
  getOrdinaryUsers,
  getAgentById,
  deleteUser,
  updateUser
} = require("../controllers/user.controller");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Admin-only routes
router.get("/agents", protect, getAgents);
router.get("/ordinary", protect, getOrdinaryUsers);
router.get("/agents/:agentId", protect, getAgentById);

router.delete("/:id", protect, deleteUser);
router.put("/:id", protect, authorizeRoles("Admin"), updateUser);

module.exports = router;