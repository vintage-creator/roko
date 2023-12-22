const UserReg = require("../../models/userReg");
const bcrypt = require("bcrypt");
const mailer = require("../../config/mailer");
const jwt = require("jsonwebtoken");
const generateToken = require("../../utils/generateToken");
const { validateUserRegistration } = require("../../utils/userValidation");

//Register/Sign up user (POST)
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

    // Check if user is less than 18 years old
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
      return res
        .status(400)
        .json({ error: "You must be at least 18 years old to sign up." });
    }
    const userExist = await UserReg.findOne({ email }).exec();
    //check if user exists
    if (userExist) {
      return res.status(401).json({ error: "User already exist!" });
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

    // Send an email with a link containing the token
    const emailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <h3 style="color: #333; text-align: center;">Welcome to Medcover Medical PI</h3>
    <p style="color: #666; text-align: center;">Thank you for registering with Medcover Medical PI! We're excited to have you on board.</p>
    <p style="color: #666; text-align: center;">To get started, we just need to verify your email address. Click the button below to complete the verification process:</p>
    <div style="text-align: center; margin-top: 20px;">
        <a href="https://rokoui.onrender.com/auth/verify?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email Address</a>
    </div>
    <div style="text-align: center; margin-top: 30px; color: #666;">
        If you have any questions or need assistance, feel free to contact our support team.
    </div>
</div>`;

    mailer(email, "Medcover: Verify your email address", emailContent);
   
    return res.status(200).json({
      success:
        "Registration successful, a link has been sent to your email to verify",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error:
        "Password must have at least 1 capital letter, 1 small letter, 1 special character, and be at least 8 characters long",
    });
  }
};

//Verify registered user (POST)
const verifyToken = async (req, res) => {
  const { token } = req.query;

  const user = await UserReg.findOne({ token }).exec();

  if (user) {
    // User's Token is valid
    user.verified = true;
    await user.save();

    return res.status(200).redirect("/email-verification");
  } else {
    return res.status(400).json({ error: "Invalid Token" });
  }
};

//Sign in session (POST)
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
      return res.status(404).json({ error: "User not found!" });
    } else if (user && user.verified === false) {
      return res.status(401).json({ error: "User not verified!" });
    }
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(500)
        .json({ error: "Email or password is not correct." });
    }
    // Generate JWT token for user authentication
    const authToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.Secret_ID,
      { expiresIn: "1h" }
    );
 
    res.status(200).json({
      message: "Login successful",
      authToken,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message,
    });
  }
};

const logoutFn = (req, res) => {
  res.clearCookie('authToken');
  res.status(200).json({ message: "Successfully Logged Out!" });
};

//Send forgot password token(POST)
const sendfgPwdFn = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({error: "Please enter your email"});
  }
  try {
    //find the user with the email
    const user = await UserReg.findOne({ email }).exec();
    if (!user) {
      return res
        .status(404)
        .json({ error: "Email not found, please sign up!" });
    }

    const token = generateToken();
    const timeStamp = new Date().getTime() + 3600000; //1hr expiration timestamp
    user.timeStamp = timeStamp;
    user.token = token;
    user.save();
    const emailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <h3 style="color: #333; text-align: center;">Reset Your Password</h3>
    <p style="color: #666; text-align: center;">You have requested to reset your password. To complete the process, please copy the token below:</p>
    <div style="text-align: center; margin-top: 20px;">
        <b>${token}</b>
    </div>
    <p style="color: #666; text-align: center;">This token will expire in 1 hour.</p>
    <div style="text-align: center; margin-top: 30px; color: #666;">
        If you did not request a password reset, please ignore this email.
    </div>
</div>
`;
    mailer(email, "Medcover: Reset your password", emailContent);
    req.userEmail = email;
    res
      .status(200)
      .json({ success: "Reset token has been sent to your email" });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message,
    });
  }
};

//Send reset token (POST)
const sendRsTokenFn = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ error: "Please enter reset token" });
  }
  try {
    const resetToken = await UserReg.findOne({ token }).exec();
    if (!resetToken) {
      return res.status(401).json({ error: "Token is invalid!" });
    }
    const tokenTimeStamp = resetToken.timeStamp;
    const now = new Date().getTime();
    const expirationTime = tokenTimeStamp - now;
    if (expirationTime > 0) {
      return res.status(200).json({ success: "Enter your new password" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Token has expired!" });
  }
};

//Send new password to database (POST)
const sendChangePwdFn = async (req, res) => {
  const { password, confirm_password } = req.body;
  try {
    const email = req.userEmail;

    // Validate the password against the pattern and confirm_password match
    const validationResult = await validateUserRegistration(
      email,
      password,
      confirm_password
    );

    if (validationResult.error) {
      return res.status(406).json({
        error:
          "Password must have at least 1 capital letter, 1 small letter, 1 special character, and be at least 8 characters long",
      });
    }

    const user = await UserReg.findOne({ email }).exec();
    if (user) {
      const hashPassword = bcrypt.hashSync(password, 10);
      user.password = hashPassword;
      await user.save(); // Await the save operation

      const emailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #ffffff; color: #343a40;">
      <h2 style="color: #007bff; text-align: center;">Password Change Notification</h2>
      <p>Hello,</p>
      <p>We are writing to inform you that your password has been changed successfully.</p>
      <p>If you did not make this change, please contact us immediately at <a href="mailto:medcover@zohomail.com" style="color: #007bff; text-decoration: none;">Medcoverteam@zohomail.com</a>.</p>
      <p>Thank you for using our service!</p>
  
      <p style="color: #6c757d;">Best regards,<br>The Medcover Team</p>
  </div>
  `;

      mailer(email, "Medcover: Password changed", emailContent);
      return res
        .status(200)
        .json({ success: "Your password has been changed" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};

module.exports = {
  signInFn,
  verifyToken,
  signUpFn,
  logoutFn,
  sendfgPwdFn,
  sendRsTokenFn,
  sendChangePwdFn,
};
