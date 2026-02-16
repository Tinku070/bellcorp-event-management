const express = require("express");
const router = express.Router();

const {
  getEvents,
  getEventById,
  seedEvents,
} = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/seed", seedEvents);

module.exports = router;
