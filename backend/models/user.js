const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, 'Your name cannot exceed 30 characters'],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [true, "Please enter a valid email"],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false // Do not return password in queries
  },
  avatar: {
    public_id: {
      type: String,
      required: [true, "Please upload an avatar"],
      default: "default.jpg"
    },
    url: {
      type: String,
      required: [true, "Please upload an avatar"],
      default: "https://res.cloudinary.com/d3m6q7b8m/image/upload/v1631987768/default.jpg"
    }


  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordtoken: String,
  resetPasswordExpiresIn: Date
});

// 🔹 Hash password before saving user to
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔹 Generate JWT Token for authentication
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  });
};

// 🔹 Match user entered password to hashed password in database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);