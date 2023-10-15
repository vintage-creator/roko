const uuid = require("uuid");
const PaymentReg = require("../../models/paymentReg");
const UserReg = require("../../models/userReg");

const subPlanFn = async (req, res) => {
  const got = (await import("got")).default;
  try {
    const txID = uuid.v4();
    const email = req.session.userEmail;
    const user = await UserReg.findOne({ email }).exec();
    if (user.paymentStatus === "completed") {
      req.flash(
        "error",
        "You have already purchased a policy"
      );
    
      // Redirect to the "/home" route
      return res.status(400).redirect("/home");
    }
    const { phone: phonenumber, fullname: name } = user;
    const { hospitalSize } = req.body;

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

    const response = await got
      .post("https://api.flutterwave.com/v3/payments", {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
        json: {
          tx_ref: txID,
          amount: 2500,
          currency: "NGN",
          redirect_url: "https://rokomedipi.onrender.com/wh/confirm-payment",
          customer: {
            email,
            phonenumber,
            name,
          },
          customizations: {
            title: "Roko Payments",
          },
        },
      })
      .json();

    await PaymentReg.create({
      ref: txID,
      fullname: name,
      email: email,
      phone: phonenumber,
      coverage: hospitalSize,
      amount: "2500",
      currency: "NGN",
    });
    res.redirect(response.data.link);
  } catch (err) {
    console.log("Error occurred, but no response body available.");
  }
};

module.exports = subPlanFn;
