import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ============ MIDDLEWARE ============
// These MUST come before any routes
app.use(cors({
  origin: ['https://encoreconstructionltd.org', 'http://localhost:3000', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`);
  if (req.method === 'POST') {
    console.log('Body:', req.body);
  }
  next();
});

console.log("🚀 Starting Encore Construction Server...");

// ============ API ROUTES ============
// ALL API routes must be defined BEFORE static file serving

// Health check
app.get("/api/health", (req, res) => {
  console.log("✅ Health check called");
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production"
  });
});

// Test route
app.get("/api/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ 
    success: true, 
    message: "API is working!",
    timestamp: new Date().toISOString()
  });
});

// Enquiry endpoint
app.post("/api/enquiries", async (req, res) => {
  console.log("📨 Received enquiry request");
  console.log("Request body:", req.body);
  
  const { name, email, phone, subject, message } = req.body || {};

  // Validation
  if (!name || !email || !message) {
    console.log("❌ Missing required fields");
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("❌ Invalid email format");
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  try {
    console.log("📤 Attempting to send email...");
    
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

    // Send JSON response
    return res.status(200).json({
      success: true,
      message: "Thank you for your enquiry! Our team will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("❌ Mail send failed:", error.message);
    console.error("Error details:", error);
    
    let errorMessage = "Failed to send your enquiry. Please try again.";
    if (error.message.includes("Invalid login")) {
      errorMessage = "Email server authentication failed. Please contact support.";
    } else if (error.message.includes("connect")) {
      errorMessage = "Could not connect to email server. Please try again later.";
    }
    
    return res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
});

// ============ SERVE STATIC FILES ============
// This must come AFTER all API routes

const distPath = path.join(__dirname, "dist");
console.log(`📁 Checking for static files at: ${distPath}`);

// Check if dist exists
if (!fs.existsSync(distPath)) {
  console.error(`❌ Dist folder not found at: ${distPath}`);
  console.log("Please run 'npm run build' first");
} else {
  console.log("✅ Dist folder found");
  // List files in dist
  const files = fs.readdirSync(distPath);
  console.log(`📄 Files in dist: ${files.join(', ')}`);
}

// Serve static files
app.use(express.static(distPath));

// ============ CATCH-ALL ROUTE ============
// This handles all non-API routes (SPA routing)
app.get("*", (req, res) => {
  // Check if it's an API route (should have been handled above)
  if (req.path.startsWith("/api/")) {
    console.log(`⚠️ API route not found: ${req.path}`);
    return res.status(404).json({ 
      success: false, 
      message: "API endpoint not found" 
    });
  }
  
  console.log(`📍 Serving index.html for: ${req.path}`);
  const indexPath = path.join(distPath, "index.html");
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error(`❌ index.html not found at: ${indexPath}`);
    res.status(404).send("Application not built properly");
  }
});

// ============ ERROR HANDLING ============
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// ============ START SERVER ============
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`📍 Frontend: http://localhost:${port}`);
  console.log(`📍 Health: http://localhost:${port}/api/health`);
  console.log(`📍 Test: http://localhost:${port}/api/test`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});

// ============ SMTP TEST ============
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
    console.error("Please check your SMTP credentials in .env");
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});