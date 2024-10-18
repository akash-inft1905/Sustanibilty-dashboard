const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carbonEmissions: {
    type: [Number], // Array of numbers (last 5 years data)
    required: true,
  },
  waterUsage: {
    type: [Number], // Array of numbers (last 5 years data)
    required: true,
  },
  wasteGenerated: {
    type: [Number], // Array of numbers (last 5 years data)
    required: true,
  },
});

const Metric = mongoose.model("Metric", metricSchema);
module.exports = Metric;
