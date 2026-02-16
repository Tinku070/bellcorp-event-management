const mongoose = require("mongoose");
require("dotenv").config();

const Event = require("./models/Event");

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
    description: "Node.js best practices",
    capacity: 80,
    category: "Tech",
  },
  {
    name: "Music Fest",
    organizer: "Live Nation",
    location: "Mumbai",
    date: new Date("2025-12-10"),
    description: "Live music festival",
    capacity: 150,
    category: "Music",
  },
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await Event.deleteMany();
    await Event.insertMany(events);

    console.log("Events seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedEvents();
