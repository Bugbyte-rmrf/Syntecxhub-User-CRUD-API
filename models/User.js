const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address"
      ]
    },

    age: {
      type: Number,
      min: [1, "Age must be at least 1"],
      max: [120, "Age cannot be greater than 120"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
