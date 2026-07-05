// backend/server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Log startup
console.log("Starting backend server...");
console.log(`SMTP Host: ${process.env.SMTP_HOST}`);

// Configure CORS
app.use(cors({
  origin: [
    "https://encoreconstructionltd.org",
    "http://localhost:5173",
    "http://localhost:3000"
  ],
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Accept"]
}));

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Create transporter with proper configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME || "info@encoreconstructionltd.org",
      pass: process.env.SMTP_PASSWORD || "ogll-eimp-eu4n-uuro",
    },
    debug: true, // Enable debug output
  });
};

// Verify SMTP connection on startup
const transporter = createTransporter();
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Failed:", error.message);
    console.error("Please check your SMTP credentials");
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

// Main endpoint
app.post("/api/enquiries", async (req, res) => {
  console.log("📨 Received enquiry request");
  console.log("Body:", req.body);

  const { name, email, phone, subject, message } = req.body || {};

  // Validate required fields
  if (!name || !email || !message) {
    console.log("❌ Missing required fields");
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || "info@encoreconstructionltd.org",
      to: process.env.MAIL_TO || "info@encoreconstructionltd.org",
      replyTo: email,
      subject: `New Enquiry: ${subject || "General"} - ${name}`,
      text: `
        New Enquiry Received
        ====================
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Subject: ${subject || "General"}
        
        Message:
        ${message}
        
        --------------------
        Sent from: Encore Construction Website
        Date: ${new Date().toLocaleString()}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C9A84C;">New Enquiry Received</h2>
          <hr style="border: 1px solid #C9A84C;">
          
          <table style="width: 100%;">
            <tr>
              <td><strong>Name:</strong></td>
              <td>${name}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${email}</td>
            </tr>
            <tr>
              <td><strong>Phone:</strong></td>
              <td>${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td><strong>Subject:</strong></td>
              <td>${subject || "General"}</td>
            </tr>
          </table>
          
          <h3 style="color: #C9A84C; margin-top: 20px;">Message:</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, "<br />")}
          </div>
          
          <hr style="border: 1px solid #C9A84C; margin-top: 20px;">
          <p style="color: #666; font-size: 12px;">
            Sent from: Encore Construction Website<br>
            Date: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    };

    console.log("📤 Attempting to send email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

    res.json({
      success: true,
      message: "Thank you for your enquiry! Our team will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("❌ Mail send failed:", error);
    console.error("Error details:", error.message);
    
    // More detailed error response
    let errorMessage = "Failed to send your enquiry. Please try again.";
    if (error.message.includes("Invalid login")) {
      errorMessage = "Email server authentication failed. Please contact support.";
    } else if (error.message.includes("connect")) {
      errorMessage = "Could not connect to email server. Please try again later.";
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Backend server running on port ${port}`);
  console.log(`📍 Health check: http://localhost:${port}/health`);
});