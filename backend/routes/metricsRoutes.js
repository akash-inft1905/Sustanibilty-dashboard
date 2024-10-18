const express = require("express");
const { addMetrics, getMetrics } = require("../controllers/metricsController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, addMetrics).get(protect, getMetrics);

module.exports = router;
