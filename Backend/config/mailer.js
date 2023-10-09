require("dotenv").config();
const nodemailer = require("nodemailer");

const mailer = async (email, subject, msg) => {
  const transporter = nodemailer.createTransport({
    service: "Outlook", // Use "Outlook" with a capital "O"
    auth: {
      user: process.env.User + "@outlook.com",
      pass: process.env.Pass + "##**.", //Use your password
    },
  });

  const mailOptions = {
    from: `[Roko] <${process.env.User}@outlook.com>`,
    to: email,
    subject: subject,
    html: msg
  };

  // Wrap the sendMail function in a Promise
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err); // Reject the promise with the error
      } else {
        resolve(info); // Resolve the promise with the info object
        console.log(`Email sent to ${email}`);
      }
    });
  });
};

module.exports = mailer;
