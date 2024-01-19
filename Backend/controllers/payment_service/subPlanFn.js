const uuid = require("uuid");
const PaymentReg = require("../../models/paymentReg");
const axios = require('axios');


const subPlanFn = async (req, res) => {
  try {
    const txID = uuid.v4();
    const {
      hospitalSize,
      plan_duration,
      email,
      phone: phonenumber,
      firstName,
      lastName,
    } = req.body;

    const existingPayment = await PaymentReg.findOne({ email });

    if (existingPayment) {
      if (existingPayment.status === "pending") {
        return res.status(200).json({responseURL: existingPayment.paymentLink});
      } else if (existingPayment.status === "completed") {
        return res
          .status(400)
          .json({ error: "You have already purchased a policy" });
      }
    }

    const name = `${firstName} ${lastName}`;
    if (!hospitalSize) {
      return res.status(400).json({
        status: "error",
        message: "Please select your hospital size",
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
        redirect_url: 'https://rokoui.onrender.com/register',
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
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phonenumber,
      coverage: hospitalSize,
      amount: '2500',
      currency: 'NGN',
      status: 'pending',
      plan_duration: plan_duration,
      paymentLink: response.data.data.link,
    };

    await PaymentReg.create(paymentData);
    res.status(200).json({responseURL: response.data.data.link, txRef: txID});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = subPlanFn;
