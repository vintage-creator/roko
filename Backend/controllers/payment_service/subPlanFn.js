const uuid = require("uuid");
const PaymentReg = require("../../models/paymentReg");
const UserReg = require("../../models/userReg");
const axios = require('axios');


const subPlanFn = async (req, res) => {
  try {
    const txID = uuid.v4();

    let hospitalSize, plan_duration, email, phonenumber, firstName, lastName, name;

    // Check if the payload structure is for hospitalSize, plan_duration, email, etc.
    if (req.body.bed_number) {
      hospitalSize = req.body.bed_number;  
      plan_duration = req.body.plan_duration;
      email = req.body.email;
      phonenumber = req.body.phone;
      name = req.body.name;
    } else {
      // Use the existing payload structure
      ({ hospitalSize, plan_duration, email, phone: phonenumber, firstName, lastName } = req.body);
      name = `${firstName} ${lastName}`;
    }

    const existingPayment = await PaymentReg.findOne({ email });
    const user = await UserReg.findOne({ email });

    if (existingPayment) {
      if (existingPayment.status === "pending") {
        return res.status(200).json({ responseURL: existingPayment.paymentLink });
      } else if (existingPayment.status === "completed") {
        if (user) {
          return res.status(200).json({ message: "Already registered. Please sign in!" });
        } else {
          return res.status(200).json({ message: "You have already purchased a policy" });
        }
      }
    }

    if (!hospitalSize || !plan_duration || !email || !firstName || !lastName) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required details",
      });
    }

    const priceMap = {
      "1-20": 50000,
      "21-50": 70000,
      "51-100": 130000,
      "101-500": 180000,
      "501-1000": 250000,
    };

    const price = priceMap[hospitalSize] || null;

    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      {
        tx_ref: txID,
        amount: 2500,
        currency: 'NGN',
        redirect_url: 'https://rokoui.onrender.com/wh/confirm-payment',
        customer: {
          email,
          phonenumber,
          name,
        },
        customizations: {
          title: 'Medcover Payments',
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    const paymentData = {
      ref: txID,
      firstName,
      lastName,
      email,
      phone: phonenumber,
      coverage: hospitalSize,
      amount: '2500',
      currency: 'NGN',
      status: 'pending',
      plan_duration,
      paymentLink: response.data.data.link,
    };

    if (existingPayment) {
      // Update the payment link in the existing payment record
      await PaymentReg.updateOne({ email }, { $set: { paymentLink: response.data.data.link } });
    } else {
      // Create a new payment record if none exists
      await PaymentReg.create(paymentData);
    }

    res.status(200).json({ responseURL: response.data.data.link, txRef: txID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = subPlanFn;

