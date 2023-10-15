const UserReg = require("../../models/userReg");
const bcrypt = require("bcrypt");
const mailer = require("../../config/mailer");
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
    const userExist = await UserReg.findOne({ email }).exec();
    //check if user exists
    if (userExist) {
      req.flash("error", "User already exist!");
      return res.status(400).redirect("/"); // Redirect to signin page
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
    // await crmLeads(email, fullname, phone);

    // Send an email with a link containing the token
    const emailContent = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <h3 style="color: #333; text-align: center;">Welcome to Roko Medical PI</h3>
    <p style="color: #666; text-align: center;">Thank you for registering with Roko Medical PI! We're excited to have you on board.</p>
    <p style="color: #666; text-align: center;">To get started, we just need to verify your email address. Click the button below to complete the verification process:</p>
    <div style="text-align: center; margin-top: 20px;">
        <a href="https://rokomedipi.onrender.com/auth/verify?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email Address</a>
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
    return res.status(200).redirect("/");
  } catch (err) {
    console.log(err);
    req.flash(
      "error",
      "Password must have at least 1 capital letter, 1 small letter, 1 special character, and be at least 8 characters long"
    );
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

    req.flash("success", "Email verified successfully!");
    return res.status(200).redirect("/");
  } else {
    req.flash("error", "Invalid Token");
    return res.status(400).redirect("/signup");
  }
};

//Sign in session (POST)
const signInFn = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    req.flash("error", "Please enter your email");
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
      return res.status(404).redirect("/signup"); // Redirect to signup page
    } else if (user && user.verified === false) {
      req.flash("error", "User not verified!");
      return res.status(401).redirect("/"); // Redirect to signin page
    }
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatched) {
      req.flash("error", "Email or password is not correct.");
      return res.status(500).redirect("/"); // Redirect to login page
    }
    // Set a verified variable to indicate authentication
    req.session.verified = true;
    req.session.userEmail = user.email;
    res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message,
    });
  }
};

//Logout session (GET)
const logoutFn = (req, res) => {
  // Clear session variables associated with authentication
  req.session.verified = false;

  res.status(200).redirect("/");
};

//Forgot password (GET)
const fgPwdFn = (req, res) => {
  res.status(200).render("forgot-pwd", { flashMessages: req.flash() });
};

//Send forgot password token(GET)
const sendfgPwdFn = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    req.flash("error", "Please enter your email");
    res.status(400).redirect("/auth/forgot_password");
  }
  try {
    //find the user with the email
    const user = await UserReg.findOne({ email }).exec();
    if (!user) {
      req.flash("error", "User not found!");
      return res.status(404).redirect("/signup");
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
    mailer(email, "Reset your password", emailContent);
    req.flash(
      "success",
      "Reset token has been sent to your email"
    );
    req.session.userEmail = email;
    res.status(200).redirect("/auth/reset-token");
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message,
    });
  }
};

//View for reset token (GET)
const rsTokenFn = (req, res) => {
  res.status(200).render("reset-token", { flashMessages: req.flash() });
};

//Send reset token (POST)
const sendRsTokenFn = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    req.flash("error", "Please enter reset token");
    res.status(400).redirect("/auth/reset-token");
  }
  try {
    const resetToken = await UserReg.findOne({ token }).exec();
  if (!resetToken) {
    req.flash("error", "Token is invalid!");
    return res.status(401).redirect("/auth/reset-token");
  }
  const tokenTimeStamp = resetToken.timeStamp;
  const now = new Date().getTime();
  const expirationTime = tokenTimeStamp - now;
  if (expirationTime > 0) {
    req.flash("success", "Enter your new password");
    return res.status(200).redirect("/auth/change-password");
  }
  } catch (error) {
    req.flash("error", "Token has expired!");
    return res.status(500).redirect("/auth/forgot_password");
  }
};

//View for change password (GET)
const changePwdFn = (req, res) => {
  res.status(200).render("change-pwd", { flashMessages: req.flash() });
}

//Send new password to database (POST)
const sendChangePwdFn = async (req, res) => {
  const {
    password,
    confirm_password,
  } = req.body;
  try {
    //validate form fields
    const email = req.session.userEmail;

    // Validate the password against the pattern and confirm_password match
    const validationResult = await validateUserRegistration(email, password, confirm_password);

    if (validationResult.error) {
      req.flash(
        "error",
        "Password must have at least 1 capital letter, 1 small letter, 1 special character, and be at least 8 characters long"
      );
      return res.status(406).redirect("/auth/forgot_password");
    }

    const user = await UserReg.findOne({ email }).exec();
    if (user) {
      const hashPassword = bcrypt.hashSync(password, 10);
      user.password = hashPassword;
      await user.save(); // Await the save operation

      req.flash(
        "success",
        "Your password has been changed"
      );
      return res.status(200).redirect("/"); //Redirect to signin page
    }
 
  } catch (error) {
    req.flash(
      "error",
      "An error occurred while processing your request"
    );
    return res.status(500).redirect("/auth/change-password");
  }
};


module.exports = {
  signInFn,
  verifyToken,
  signUpFn,
  logoutFn,
  fgPwdFn,
  sendfgPwdFn,
  rsTokenFn,
  sendRsTokenFn,
  changePwdFn,
  sendChangePwdFn
};
