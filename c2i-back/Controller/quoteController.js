const Quote = require("../Models/quote");
const sendEmail = require("../utils/sendEmail");

exports.createQuote = async (req, res) => {
  // Required fields validation
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "company",
    "trainingTitle",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      missingFields,
    });
  }

  try {
    // Create and save quote
    const quote = new Quote({
      ...req.body,
      createdAt: new Date(),
    });

    const savedQuote = await quote.save();

    // Send email notification
    await sendEmail({
      to: process.env.RECEIVING_EMAIL,
      subject: `New Quote Request: ${req.body.trainingTitle}`,
      html: generateEmailTemplate(savedQuote),
    });

    res.status(201).json({
      success: true,
      quote: savedQuote,
    });
  } catch (error) {
    console.error("Quote creation error:", error);

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Duplicate entry",
        message: "A quote with this email already exists",
      });
    }

    res.status(500).json({
      error: "Server Error",
      message: error.message,
    });
  }
};

function generateEmailTemplate(quote) {
  return `
    <h2>Quote Request: ${quote.trainingTitle || "Custom Training"}</h2>
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h3 style="color: #6b46c1;">Contact Information</h3>
      <img src="D:\c2iwebsite2\c2i\src\images\c2o.png"></img>
      <p><strong>Name:</strong> ${quote.firstName} ${quote.lastName}</p>
      <p><strong>Email:</strong> ${quote.email}</p>
      <p><strong>Phone:</strong> ${quote.phone}</p>
      <p><strong>Company:</strong> ${quote.company}</p>
      <p><strong>Job Title:</strong> ${quote.jobTitle || "Not specified"}</p>
      
      <h3 style="color: #6b46c1; margin-top: 20px;">Training Details</h3>
      <p><strong>Training Program:</strong> ${quote.trainingTitle}</p>
      <p><strong>Team Size:</strong> ${quote.teamSize}</p>
      <p><strong>Preferred Location:</strong> ${quote.preferredLocation}</p>
      <p><strong>Preferred Dates:</strong> ${
        quote.preferredDates || "Flexible"
      }</p>
      <p><strong>Urgency:</strong> ${quote.urgency || "Not specified"}</p>
      
      <h3 style="color: #6b46c1; margin-top: 20px;">Additional Requirements</h3>
      <p>${
        quote.specificRequirements || "No additional requirements specified"
      }</p>
      <p><strong>Budget:</strong> ${quote.budget || "Not specified"}</p>
      
      <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
        Submitted: ${quote.createdAt.toLocaleString()}
      </p>
    </div>
  `;
}
