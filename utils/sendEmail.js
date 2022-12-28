const keys = require('../config/keys')
const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: keys.smptHost,
    port: keys.smptOort,
    service: keys.smptService,
    auth: {
      user: keys.smptMail,
      pass: keys.smptPassword,
    },
  });

  const mailOptions = {
    from: keys.smptMail,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;