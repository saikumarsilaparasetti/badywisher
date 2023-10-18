const nodemailer = require("nodemailer");
const logger = require("../../logger");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

async function triggerMail(mail) {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_ID,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });

    logger.info(`Mail triggered with id ${info.messageId}`);
  } catch (error) {
    logger.error();
  }
}

module.exports = { triggerMail };
