const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (to, subject, template) => {
  const msg = {
    to: to, // Change to your recipient
    from: process.env.SENDGRID_VERIFIED_SENDER, // Change to your verified sender
    subject: subject,
    html: `<h1>Hello World</h1>`,
  };

  let info = { error: "", success: false };

  sgMail
    .send(msg)
    .then(() => {
      info = { ...info, success: true };
    })
    .catch((error) => {
      info = { ...info, error };
    });
  return info;
};

module.exports = sendMail;
