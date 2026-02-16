const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerEvent,
  cancelRegistration,
  getMyEvents,
} = require("../controllers/registrationController");

router.post("/:eventId", protect, registerEvent);
router.delete("/:eventId", protect, cancelRegistration);
router.get("/my", protect, getMyEvents);

module.exports = router;
