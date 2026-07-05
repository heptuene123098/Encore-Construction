// server.js - Update with better error handling
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://encoreconstructionltd.org"
}));
app.use(express.json());

// Verify SMTP connection on startup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME || "info@encoreconstructionltd.org",
    pass: process.env.SMTP_PASSWORD || "ogll-eimp-eu4n-uuro",
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log("SMTP server is ready to send emails");
  }
});

app.post("/api/enquiries", async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing required fields." 
    });
  }

  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || "info@encoreconstructionltd.org",
      to: process.env.MAIL_TO || "info@encoreconstructionltd.org",
      replyTo: email,
      subject: `New enquiry: ${subject || "General"}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Subject: ${subject || "General"}

Message:
${message}
      `.trim(),
      html: `
        <h3>New enquiry received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Subject:</strong> ${subject || "General"}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    
    res.json({ 
      success: true, 
      message: "Enquiry sent successfully." 
    });
  } catch (error) {
    console.error("Mail send failed:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send enquiry. Please try again or email us directly." 
    });
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Mail server running on port ${port}`);
});