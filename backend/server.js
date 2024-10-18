const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://sustanibilty-dashboard-oren.onrender.com/",
  ],
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/metrics", require("./routes/metricsRoutes"));

if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
