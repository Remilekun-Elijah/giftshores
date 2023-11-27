const path = require("path");
const config = require("./index");
const nodemailer = require("nodemailer");
const { info, error, success } = require("consola");
const { sendGiftTemplate } = require("../email/gift");

exports.sendMail = async function (message) {
  info("sending mail to", message.to + "...");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: config.smtp_host,
    port: 465, // 587 465Z
    // secure: true,
    _auth: {
      user: config.smtp_user,
      pass: config.smtp_secret,
    },
    get auth() {
      return this._auth;
    },
    set auth(value) {
      this._auth = value;
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
            message.handleError()
          } else{
            message.handleSuccess()
            success("Email sent to:", info.messageId, "after failed trial ");
         }   });
      } else {
        message.handleSuccess()
        success("Email sent to:", infos.messageId);
      }
    });
  } catch (e) {
    throw new Error(
      "Something is wrong with the mail service, please try again."
    );
  }
};
