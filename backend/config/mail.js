const path = require("path");
const config = require("./index");
const nodemailer = require("nodemailer");
const { info, error, log } = console;
const { sendGiftTemplate } = require("../email/gift");

exports.sendMail = async function (message) {
  console.log(sendGiftTemplate({ ...message.data, purpose: message.subject }));
  info("sending mail to", message.to + "...");
  const transporter = nodemailer.createTransport({
    host: config.smtp_host,
    port: 465, // 587 465
    secure: true,
    auth: {
      user: config.smtp_user,
      pass: config.smtp_secret,
    },
  });
  const packet = {
    from: `"${config.application_name}" <${config.smtp_from}>`,
    to: message.to,
    replyTo: `<${config.smtp_from}>`,
    subject: message.subject,
    html: sendGiftTemplate({ ...message.data, purpose: message.subject }),
  };

  try {
    /* send the mail */
    transporter.sendMail(packet, (err, infos) => {
      if (err) {
        error("email sending failed:", err.message);
        info("attempting to send mail again...");
        transporter.sendMail(packet, (err, info) => {
          if (err) {
            console.error(err);
            error("Failed to send mail");
          } else log("Email sent to:", info.messageId, "after failed trial ");
        });
      } else log("Email sent to:", infos.messageId);
    });
  } catch (e) {
    throw new Error(
      "Something is wrong with the mail service, please try again."
    );
  }
};
