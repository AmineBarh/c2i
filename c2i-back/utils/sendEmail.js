const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  // Validate required fields
  if (!to || !subject || !html) {
    throw new Error("Missing required email fields");
  }

  // Create reusable transporter object
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // For services other than Gmail, you might need:
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    // secure: true/false
  });

  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Training Requests" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
