const { default: mongoose } = require("mongoose");
const { userDB } = require("../config/databases/rokoDatabase");

const userSchema = new mongoose.Schema({
  protect: {
    type: String,
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
  timeStamp: {
    type: String,
  },
  paymentStatus: {
    type: String,
    default: "pending",
  },
  lastPaymentDate: {
    type: Date,
  },
  paymentReminderSent: {
    type: Boolean,
    default: false 
  },
  policyExpiredReminderSent: {
    type: Boolean,
    default: false 
  },
  day5ReminderSent: {
    type: Boolean,
    default: false
  },

  day4ReminderSent: {
    type: Boolean,
    default: false
  },

  day3ReminderSent: {
    type: Boolean,
    default: false
  },

  day2ReminderSent: {
    type: Boolean,
    default: false
  },

  day1ReminderSent: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false,
  },
  claims: [{ type: mongoose.Schema.Types.ObjectId, ref: "ClaimReg" }],
});

const UserReg = userDB.model("UserReg", userSchema);
module.exports = UserReg;
