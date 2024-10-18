const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const Metric = require("./models/Metric");

dotenv.config();

connectDB();

const users = [
  {
    email: "admin1@example.com",
    password: bcrypt.hashSync("password123", 10),
  },
  {
    email: "admin2@example.com",
    password: bcrypt.hashSync("password123", 10),
  },
  {
    email: "admin3@example.com",
    password: bcrypt.hashSync("password123", 10),
  },
  {
    email: "admin4@example.com",
    password: bcrypt.hashSync("password123", 10),
  },
  {
    email: "admin5@example.com",
    password: bcrypt.hashSync("password123", 10),
  },
];

const metrics = [
  {
    carbonEmissions: [50, 48, 46, 44, 42],
    waterUsage: [1200, 1180, 1150, 1120, 1100],
    wasteGenerated: [200, 190, 180, 170, 160],
  },
  {
    carbonEmissions: [60, 58, 56, 54, 52],
    waterUsage: [1300, 1280, 1250, 1220, 1200],
    wasteGenerated: [250, 240, 230, 220, 210],
  },
  {
    carbonEmissions: [70, 68, 66, 64, 62],
    waterUsage: [1400, 1380, 1350, 1320, 1300],
    wasteGenerated: [300, 290, 280, 270, 260],
  },
  {
    carbonEmissions: [80, 78, 76, 74, 72],
    waterUsage: [1500, 1480, 1450, 1420, 1400],
    wasteGenerated: [350, 340, 330, 320, 310],
  },
  {
    carbonEmissions: [90, 88, 86, 84, 82],
    waterUsage: [1600, 1580, 1550, 1520, 1500],
    wasteGenerated: [400, 390, 380, 370, 360],
  },
];

const seedData = async () => {
  try {
    await User.deleteMany();
    await Metric.deleteMany();

    const createdUsers = await User.insertMany(users);

    for (let i = 0; i < createdUsers.length; i++) {
      const newMetric = new Metric({
        user: createdUsers[i]._id,
        carbonEmissions: metrics[i].carbonEmissions,
        waterUsage: metrics[i].waterUsage,
        wasteGenerated: metrics[i].wasteGenerated,
      });
      await newMetric.save();
    }

    console.log("Data successfully seeded!");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
