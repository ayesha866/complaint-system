const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/message.controller");

router.post("/", sendMessage);
router.get("/:complaintId", getMessages);

module.exports = router;