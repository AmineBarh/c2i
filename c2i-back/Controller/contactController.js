const Contact = require("../Models/contact");
const sendEmail = require("../utils/sendEmail");

exports.createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const savedContact = await contact.save();

    // Send email notification
    await sendEmail({
      to: process.env.RECEIVING_EMAIL,
      subject: `New Contact: ${req.body.name}`,
      html: generateContactEmailTemplate(savedContact),
    });

    res.status(201).json({
      success: true,
      contact: savedContact,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server Error",
      message: error.message,
    });
  }
};

function generateContactEmailTemplate(contact) {
  return `
    <h2>New Contact Submission</h2>
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h3 style="color: #6b46c1;">Contact Details</h3>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone}</p>
      
      <h3 style="color: #6b46c1; margin-top: 20px;">Message</h3>
      <p>${contact.message}</p>
      
      <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
        Submitted: ${contact.createdAt.toLocaleString()}
      </p>
    </div>
  `;
}
