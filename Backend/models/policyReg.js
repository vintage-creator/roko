const mongoose = require("mongoose");
const { policyDB }  = require("../config/databases/rokoDatabase");

const insuranceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    required: true,
    trim: true,
  },
  coverage: [
    {
      details: String,
      courses: [
        {
          name: String,
          description: String,
          videoLink: String,
        }
      ],
    }
  ],
  termsAndConditions: {
    type: String,
    trim: true,
  }
});

const PolicyReg = policyDB.model("PolicyReg", insuranceSchema);

module.exports = PolicyReg;
