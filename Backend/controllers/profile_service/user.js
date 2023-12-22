const UserReg = require("../../models/userReg");
const PaymentReg = require("../../models/paymentReg");
const mailer = require("../../config/mailer");

//Get a user's profile
const getUserProfileFn = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserReg.findById(userId, "-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a user's profile
const updateProfileFn = async (req, res) => {
  try {
    const userId = req.user._id;

    const updatedUser = await UserReg.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a user's profile
const deleteProfileFn = async (req, res) => {
  try {
    const userId = req.user._id;

    const deletedUser = await UserReg.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get payment status notice (Banner notification message)
const getBannerMessageFn = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserReg.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const paymentStatus = user.paymentStatus;
    const lastPaymentDate = user.lastPaymentDate;
    const userEmail = user.email;
    const subscriber = await PaymentReg.findOne({ email: userEmail });
    const userFullnames = user.fullname.split(" ");
    const userFirstname = userFullnames[0];

    const currentDate = new Date();
    const paymentDate = new Date(lastPaymentDate);
    const expirationDate = new Date(paymentDate);
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    if (paymentStatus === "completed") {
      if (currentDate > expirationDate && !user.policyExpiredReminderSent) {
        // Send expiration reminder email
        const expirationEmailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
        <h3 style="color: #333; text-align: center;">Policy Expired</h3>
        <p style="color: #666; text-align: center;">Dear ${userFirstname},</p>
        <p style="color: #666; text-align: center;">Your policy has expired. Please log in to your account to renew your policy.</p>
      </div>`;
        mailer(
          userEmail,
          "Medcover: Policy Expiration Reminder",
          expirationEmailContent
        );

        // Set the flag to indicate that the reminder has been sent
        user.policyExpiredReminderSent = true;
        paymentStatus = "pending";
        subscriber.status = "pending";
        await user.save();
        await subscriber.save();

        return res.status(200).json({
          message: `Your policy has expired, ${userFirstname}.`,
        });
      } else {
        const daysRemaining = Math.ceil(
          (expirationDate - currentDate) / (1000 * 60 * 60 * 24)
        );

        if (daysRemaining <= 5 && !user[`day${daysRemaining}ReminderSent`]) {
          // Send reminder email for specific day
          const reminderEmailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
            <h3 style="color: #333; text-align: center;">Policy Renewal Reminder</h3>
            <p style="color: #666; text-align: center;">Dear ${userFirstname},</p>
            <p style="color: #666; text-align: center;">Renew your policy in ${daysRemaining} days.</p>
          </div>`;
          mailer(
            userEmail,
            `Medcover: Policy Renewal Reminder (${daysRemaining} days remaining)`,
            reminderEmailContent
          );

          // Set the flag to indicate that the reminder has been sent
          user[`day${daysRemaining}ReminderSent`] = true;
          await user.save();

          return res.status(200).json({
            message: `Renew your policy in ${daysRemaining} days.`,
          });
        }
      }
    } else if (paymentStatus === "pending" && !user.paymentReminderSent) {
      // Send payment reminder email
      const paymentReminderEmailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
        <h3 style="color: #333; text-align: center;">Policy Purchase Reminder</h3>
        <p style="color: #666; text-align: center;">Dear ${userFirstname},</p>
        <p style="color: #666; text-align: center;">You are yet to purchase a policy. Click here to proceed.</p>
      </div>`;
      mailer(
        userEmail,
        "Medcover: Policy Purchase Reminder",
        paymentReminderEmailContent
      );

      // Set the flag to indicate that the reminder has been sent
      user.paymentReminderSent = true;
      await user.save();

      return res.status(200).json({
        message: `You are yet to purchase a policy, ${userFirstname}.`,
      });
    }

    return res.status(204).json({ message: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getUserProfileFn,
  updateProfileFn,
  deleteProfileFn,
  getBannerMessageFn,
};
