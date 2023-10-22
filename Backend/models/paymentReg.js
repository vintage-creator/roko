const { default: mongoose } = require("mongoose");
const {paymentDB}  = require("../config/databases/rokoDatabase");

const paymentSchema = new mongoose.Schema({
  ref: {
    type: String,
    required: true
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
  coverage: {
    type: String,
    trim: true,
  },
  amount: {
    type: String,
    trim: true,
  },
  currency: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
    default: "pending"
  },
  paymentLink: {
    type: String,
    trim: true,
  }
});

const PaymentReg = paymentDB.model("PaymentReg", paymentSchema);
module.exports = PaymentReg;
