require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter
  .sendMail({
    from: `"Test Mailer" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "Test Email from Nodemailer",
    html: "<h1>Hello from your Node app!</h1>",
  })
  .then(() => console.log("✅ Email sent successfully"))
  .catch((err) => console.error("❌ Failed to send email:", err));
