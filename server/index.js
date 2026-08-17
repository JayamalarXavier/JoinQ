require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const queueRoutes = require("./routes/queueRoutes");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Preflight requests
app.options(/.*/, cors());

// Health check
app.get("/", (req, res) => {
  res.send("JoinQ Backend is Working 🚀");
});

// Queue routes
app.use("/api/queues", queueRoutes);

// Deployment-safe port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});