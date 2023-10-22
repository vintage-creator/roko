const mongoose = require("mongoose");
const { claimsDB } = require("../config/databases/rokoDatabase");

const claimSchema = new mongoose.Schema({
  claimant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserReg", // Referencing the UserReg model
    required: true,
  },
  details: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  supportingDocuments: [String],
  dateFiled: {
    type: Date,
    default: Date.now,
  },
  dateProcessed: Date,
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserReg", // Referencing the UserReg model
  },
  name: String,
  remarks: String,
});

const ClaimReg = claimsDB.model("ClaimReg", claimSchema);

module.exports = ClaimReg;
