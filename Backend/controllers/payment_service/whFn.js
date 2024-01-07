const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);
const PaymentReg = require("../../models/paymentReg");
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
        return res.status(404).json({ message: "Transaction was not found." });
      }

      const email = transactionDetails.email;
      const firstName = transactionDetails.firstName;
      const lastName = transactionDetails.lastName;
      const fullname =`${firstName} ${lastName}`
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
       
        const emailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
                <h3 style="color: #333; text-align: center;">Welcome to Medcover, ${fullname}!</h3>
                <p style="color: #666; text-align: center;">
                    Thank you for choosing Medcover for your insurance needs. We're thrilled to have you as our valued customer.
                </p>
                <p style="color: #666; text-align: center;">
                    Your payment has been successfully processed, and your policy is now active.
                </p>
                
                <div style="text-align: center; margin-top: 30px; color: #666;">
                    If you have any questions or need assistance, feel free to contact our support team.
                </div>
            </div>
            `;
        mailer(email, "Medcover - Payment Successful", emailContent);
        res.status(200).json({"success": "Your payment was successful"});
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

const hmFn = async (req, res) => {
  // Perform any necessary processing
  try {
  
    const transactionStatus = req.query.status;
    if (!transactionStatus) {
      return res.status(404).json({ message: "Transaction was not found." });
    }
    console.log(transactionStatus, "status");
    const paymentStatus = await PaymentReg.findOne({status: transactionStatus});
    console.log(paymentStatus, "paymentStatus");

    if (paymentStatus != "successful") {
      return res.status(400).json({ message: 'Your payment was not successful.' });
    } 
    return res.status(200).json({ success: "Your payment was successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { whFn, hmFn };
