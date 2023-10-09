const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  protect: {
    type: String,
    required: true,
    trim: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: "user",
  },
  dateOfBirth: {
    type: Date,
  },
  idType: {
    type: String,
    trim: true,
  },
  idNumber: {
    type: String,
    trim: true,
  },
  fieldOfPractice: {
    type: String,
    trim: true,
  },
  yearsOfExperience: {
    type: Number,
  },
  hasPreviousLegalAction: {
    type: Boolean,
  },
  summaryOfLegalAction: {
    type: String,
    trim: true,
  },
  token: {
    type: String, 
  },
  verified: {
    type: Boolean,
    default: false, 
  }
});

const UserReg = mongoose.model("UserReg", userSchema);
module.exports = UserReg;
