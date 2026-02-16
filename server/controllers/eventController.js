const Event = require("../models/Event");

exports.getEvents = async (req, res) => {
  const { search, category, location, date } = req.query;

  let query = {};

  if (search) query.name = { $regex: search, $options: "i" };
  if (category) query.category = category;
  if (location) query.location = location;
  if (date) query.date = { $gte: new Date(date) };

  const events = await Event.find(query);
  res.json(events);
};

exports.getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
};

exports.seedEvents = async (req, res) => {
  await Event.deleteMany();

  const events = [
    {
      name: "React Conference",
      organizer: "Meta",
      location: "Hyderabad",
      date: new Date("2026-03-10"),
      description: "React deep dive",
      capacity: 100,
      category: "Tech",
    },
    {
      name: "Node.js Summit",
      organizer: "OpenJS",
      location: "Bangalore",
      date: new Date("2026-02-20"),
      description: "Node backend event",
      capacity: 80,
      category: "Tech",
    },
    {
      name: "Music Fest",
      organizer: "Live Nation",
      location: "Mumbai",
      date: new Date("2025-12-10"),
      description: "Live music",
      capacity: 150,
      category: "Music",
    },
  ];

  await Event.insertMany(events);

  res.json({ message: "Events seeded" });
};
