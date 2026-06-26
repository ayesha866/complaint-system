const express = require("express");
const router = express.Router();
const { assignComplaint } = require("../controllers/assigned.controller");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/", protect, authorizeRoles("Admin"), assignComplaint);

module.exports = router;