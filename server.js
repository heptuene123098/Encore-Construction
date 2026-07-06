import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

console.log("🚀 Starting Encore Construction Server...");

// ============ HEALTH CHECK ============
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============ EMAIL ENDPOINT ============
app.post("/api/enquiries", async (req, res) => {
  console.log("📨 Received enquiry request");
  
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME || "info@encoreconstructionltd.org",
        pass: process.env.SMTP_PASSWORD || "ogll-eimp-eu4n-uuro",
      },
    });

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
  
  <table style="width: 100%; margin: 15px 0;">
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

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

    res.json({
      success: true,
      message: "Thank you for your enquiry! Our team will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("❌ Mail send failed:", error.message);
    
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

// ============ SERVE STATIC FILES ============
// Now serving from root dist folder
const distPath = path.join(__dirname, "dist");
console.log(`📁 Serving static files from: ${distPath}`);

// Serve static files
app.use(express.static(distPath));

// ============ SPA CATCH-ALL ROUTE ============
app.get("*", (req, res) => {
  // Skip API routes
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  
  // Send index.html for client-side routing
  res.sendFile(path.join(distPath, "index.html"));
});

// ============ START SERVER ============
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`📍 Frontend: http://localhost:${port}`);
  console.log(`📍 API: http://localhost:${port}/api/health`);
  
  // Test SMTP connection
  const testTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME || "info@encoreconstructionltd.org",
      pass: process.env.SMTP_PASSWORD || "ogll-eimp-eu4n-uuro",
    },
  });
  
  testTransporter.verify((error) => {
    if (error) {
      console.error("⚠️ SMTP Connection Failed:", error.message);
    } else {
      console.log("✅ SMTP Server is ready to send emails");
    }
  });
});