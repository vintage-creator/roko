const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);
const PaymentReg = require("../../models/paymentReg");
const UserReg = require("../../models/userReg");
const mailer = require("../../config/mailer");

const whFn = async (req, res) => {
  const secretHash = process.env.WEBHOOK_SECRET;
  const signature = req.headers["verif-hash"];

  if (!signature || signature !== secretHash) {
    // This request isn't from Flutterwave; discard
    return res.status(401).send("This request is unauthorized!");
  }
  try {
    if (req.body.status === "successful") {
      const transactionDetails = await PaymentReg.findOne({
        ref: req.body.txRef,
      });
      if (!transactionDetails) {
        return res.status(404).json({ message: "Transaction not found." });
      }

      const email = transactionDetails.email;
      const firstName = transactionDetails.firstName;
      const lastName = transactionDetails.lastName;
      const fullname =`${firstName}${lastName}`
      const response = await flw.Transaction.verify({
        id: req.body.id.toString(),
      });
      if (
        response.data.status === "successful" ||
        response.data.amount === transactionDetails.amount ||
        response.data.currency === "NGN"
      ) {
        transactionDetails.status = "completed";
        await transactionDetails.save();
        // Retrieve the user
        const user = await UserReg.findOne({ email: email });
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }

        // Update the paymentStatus in UserReg model
        user.paymentStatus = "completed";
        user.lastPaymentDate = new Date();
        await user.save();

        const emailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
                <h3 style="color: #333; text-align: center;">Welcome to Roko, ${fullname}!</h3>
                <p style="color: #666; text-align: center;">
                    Thank you for choosing Roko for your insurance needs. We're thrilled to have you as our valued customer.
                </p>
                <p style="color: #666; text-align: center;">
                    Your payment has been successfully processed, and your policy is now active.
                </p>
                <div style="text-align: center; margin-top: 20px;">
                    <a href="https://rokoui.onrender.com/dashboard" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">
                        Go to Dashboard
                    </a>
                </div>
                <div style="text-align: center; margin-top: 30px; color: #666;">
                    If you have any questions or need assistance, feel free to contact our support team.
                </div>
            </div>
            `;
        mailer(email, "Medcover - Payment Successful", emailContent);
      } else {
        return res.status(500).json({
          message: "Webhook received but not a successful transaction.",
        });
      }
    } else {
      return res.status(400).json({ message: "Invalid status received." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const hmFn = (req, res) => {
  // Perform any necessary processing
  res.status(200).json({"success": "Your payment was successful"});
};

module.exports = { whFn, hmFn };
