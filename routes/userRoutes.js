const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

// Check whether a MongoDB ID has a valid format
function isValidObjectId(id) {
  return mongoose.isValidObjectId(id);
}

// 1. CREATE a new user
// POST /api/users
router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Check required fields
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim()
    ) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    // Check age if supplied
    if (
      age !== undefined &&
      (
        typeof age !== "number" ||
        !Number.isFinite(age) ||
        !Number.isInteger(age)
      )
    ) {
      return res.status(400).json({
        message: "Age must be a valid integer"
      });
    }

    // Create a new user document
    const user = await User.create({
      name,
      email,
      ...(age !== undefined ? { age } : {})
    });

    return res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A user with this email already exists"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map(
          (item) => item.message
        )
      });
    }

    return res.status(500).json({
      message: "Failed to create user"
    });
  }
});


// 2. READ all users
// GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      message: "Users retrieved successfully",
      count: users.length,
      users
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve users"
    });
  }
});


// 3. READ a single user
// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve user"
    });
  }
});


// 4. UPDATE a user
// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    // Require at least one field to update
    if (
      name === undefined &&
      email === undefined &&
      age === undefined
    ) {
      return res.status(400).json({
        message: "Provide at least one field to update"
      });
    }

    // Validate name when supplied
    if (
      name !== undefined &&
      typeof name !== "string"
    ) {
      return res.status(400).json({
        message: "Name must be a string"
      });
    }

    if (
      name !== undefined &&
      !name.trim()
    ) {
      return res.status(400).json({
        message: "Name cannot be empty"
      });
    }

    // Validate email when supplied
    if (
      email !== undefined &&
      (
        typeof email !== "string" ||
        !email.trim()
      )
    ) {
      return res.status(400).json({
        message: "Email must be a non-empty string"
      });
    }

    // Validate age when supplied
    if (
      age !== undefined &&
      (
        typeof age !== "number" ||
        !Number.isFinite(age) ||
        !Number.isInteger(age)
      )
    ) {
      return res.status(400).json({
        message: "Age must be a valid integer"
      });
    }

    // Build an update containing only allowed fields
    const updates = {};

    if (name !== undefined) {
      updates.name = name;
    }

    if (email !== undefined) {
      updates.email = email;
    }

    if (age !== undefined) {
      updates.age = age;
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A user with this email already exists"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: Object.values(error.errors).map(
          (item) => item.message
        )
      });
    }

    return res.status(500).json({
      message: "Failed to update user"
    });
  }
});


// 5. DELETE a user
// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      user
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete user"
    });
  }
});

module.exports = router;
