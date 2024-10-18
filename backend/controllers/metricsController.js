const Metric = require("../models/Metric");

exports.addMetrics = async (req, res) => {
  const { carbonEmissions, waterUsage, wasteGenerated } = req.body;
  let metrics = await Metric.findOne({ user: req.user.id });

  if (metrics) {
    // Update existing metrics
    metrics.carbonEmissions = carbonEmissions;
    metrics.waterUsage = waterUsage;
    metrics.wasteGenerated = wasteGenerated;
  } else {
    // Create new metrics record
    metrics = new Metric({
      user: req.user.id,
      carbonEmissions,
      waterUsage,
      wasteGenerated,
    });
  }

  await metrics.save();
  res.json({ message: "Metrics updated successfully", metrics });
};

// Get metrics for the logged-in user
exports.getMetrics = async (req, res) => {
  const metrics = await Metric.findOne({ user: req.user.id });
  if (!metrics) {
    return res.status(404).json({ message: "Metrics not found" });
  }
  res.json(metrics);
};
