const mailer = require("../../config/mailer");

const contactFn = (req, res) => {
  res.render("contact", { flashMessages: req.flash() });
};

const sendMsgFn = (req, res) => {
  const { name, email, message, subject } = req.body;

  if (!name || !email || !message || !subject) {
    req.flash("error", "Please fill in the details completely");
    res
      .status(400)
      .json({
        status: "error",
        message: "Please fill in the details completely",
      });
    return;
  }

  const emailContent = `<div><p>Name: ${name}</p><p>Email: ${email}</p><p><b>Message</b>: ${message}</p></div>`;
  mailer("chuksy3@gmail.com", subject, emailContent);
  req.flash(
    "success",
    "Your message has been received, we will reply you shortly!"
  );
  return res.redirect("/contact/us");
};

module.exports = { contactFn, sendMsgFn };
