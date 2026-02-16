const Registration = require("../models/Registration");
const Event = require("../models/Event");

exports.registerEvent = async (req, res) => {
  const event = await Event.findById(req.params.eventId);

  const already = await Registration.findOne({
    user: req.user._id,
    event: event._id,
  });

  if (already)
    return res.status(400).json({ message: "Already registered" });

  const count = await Registration.countDocuments({ event: event._id });

  if (count >= event.capacity)
    return res.status(400).json({ message: "Event full" });

  const reg = await Registration.create({
    user: req.user._id,
    event: event._id,
  });

  res.json(reg);
};

exports.cancelRegistration = async (req, res) => {
  await Registration.findOneAndDelete({
    user: req.user._id,
    event: req.params.eventId,
  });

  res.json({ message: "Registration cancelled" });
};

exports.getMyEvents = async (req, res) => {
  const regs = await Registration.find({ user: req.user._id }).populate(
    "event"
  );
  res.json(regs);
};
