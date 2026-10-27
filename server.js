const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "User CRUD API is running"
  });
});

// Register user routes
app.use("/api/users", require("./routes/userRoutes"));

// Handle requests to unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Handle unexpected errors
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error"
  });
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from the .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
