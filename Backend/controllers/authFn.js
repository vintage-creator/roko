const UserReg = require("../models/userReg");
const joi = require("joi");
const bcrypt = require("bcrypt");
const mailer = require("../config/mailer");
const generateToken = require("../utils/generateToken");
const { validateUserRegistration } = require("../utils/userValidation");
const crmLeads = require("../config/crm");

const signUpFn = async (req, res) => {
  const {
    email,
    password,
    confirm_password,
    protect,
    fullname,
    phone,
    dateOfBirth,
    idType,
    idNumber,
    fieldOfPractice,
    yearsOfExperience,
    hasPreviousLegalAction,
    summaryOfLegalAction,
  } = req.body;

  try {
    //validate form fields
    await validateUserRegistration(email, password, confirm_password);
    const userExist = await UserReg.findOne({ email }).exec();
    //check if user exists
    if (userExist) {
      req.flash("error", "User already exist!");
      return res.redirect("/"); // Redirect to signup page
    }
    const token = generateToken();
    const hashPassword = bcrypt.hashSync(password, 10);
    await UserReg.create({
      email,
      protect,
      fullname,
      phone,
      dateOfBirth,
      idType,
      idNumber,
      fieldOfPractice,
      yearsOfExperience,
      hasPreviousLegalAction,
      summaryOfLegalAction,
      password: hashPassword,
      token,
    });
    await crmLeads(email, fullname);

    // Send an email with a link containing the token
    const emailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <h3 style="color: #333; text-align: center;">Welcome to Roko Medical PI</h3>
    <p style="color: #666; text-align: center;">Thank you for registering with Roko Medical PI! We're excited to have you on board.</p>
    <p style="color: #666; text-align: center;">To get started, we just need to verify your email address. Click the button below to complete the verification process:</p>
    <div style="text-align: center; margin-top: 20px;">
        <a href="http://localhost:8000/auth/verify?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email Address</a>
    </div>
    <div style="text-align: center; margin-top: 30px; color: #666;">
        If you have any questions or need assistance, feel free to contact our support team.
    </div>
</div>`;

    mailer(email, "Verify your email address", emailContent);
    req.flash(
      "success",
      "Registration successful, a link has been sent to your email to verify"
    );
    return res.redirect("/");
  } catch (err) {
    req.flash(
      "error",
      "Password must have at least 1 capital letter, 1 small letter, 1 special character, and be at least 8 characters long"
    );
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.query;

  const user = await UserReg.findOne({ token }).exec();

  if (user) {
    // User's Token is valid
    user.verified = true;
    await user.save();

    req.flash("success", "Email verified successfully!");
    return res.redirect("/signin");
  } else {
    req.flash("error", "Invalid Token");
    return res.redirect("/");
  }
};

const signInFn = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    res
      .status(400)
      .json({ status: "error", message: "Please input your credentials" });
    return;
  }

  try {
    //find the user with the email
    const user = await UserReg.findOne({ email }).exec();
    if (!user) {
      req.flash("error", "User not found!");
      return res.redirect("/"); // Redirect to login page
    }
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatched) {
      req.flash("error", "Email or password is not correct.");
      return res.redirect("/"); // Redirect to login page
    }
    // Set a verified variable to indicate authentication
    req.session.verified = true;
    res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message,
    });
  }
};

const logoutFn = (req, res) => {
  // Clear session variables associated with authentication
  req.session.verified = false;

  res.redirect("/signin");
};

module.exports = { signInFn, verifyToken, signUpFn, logoutFn };
