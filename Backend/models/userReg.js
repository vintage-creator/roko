const { default: mongoose } = require("mongoose");
const { userDB } = require("../config/databases/rokoDatabase");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  reg_number: {
    type: String,
    trim: true,
  },
  staff_number: {
    type: String,
    trim: true,
  },
  company_number: {
    type: String,
    trim: true,
  },
  bed_number: {
    type: String,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
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
  area: {
    type: String,
    required: true,
    trim: true,
  },
  resAddress: {
    type: String,
    trim: true,
  },
  profession: {
    type: String,
    trim: true,
  },
  partners: {
    type: String,
    trim: true,
  },
  rank: {
    type: String,
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
  state: {
    type: String,
    required: True,
    trim: true,
  },
  nextofkin: {
    type: String,
    trim: true,
  },
  hospitalSize: {
    type: String,
    trim: true,
  },
  plan_duration: {
    type: String,
    trim: true,
  },
  employmentStatus: {
    type: String,
    trim: true,
  },
  employerName: {
    type: String,
    trim: true,
  },
  employerAddress: {
    type: String,
    trim: true,
  },
  employerPhone: {
    type: String,
    trim: true,
  },
  bvn: {
    type: String,
    trim: true,
  },
  yes: {
    type: String,
    trim: true,
  },
  no: {
    type: String,
    trim: true,
  },
  summary: {
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
