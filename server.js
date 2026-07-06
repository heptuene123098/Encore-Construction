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

app.use(cors());
app.use(express.json());

console.log("🚀 Starting Encore Construction Server...");

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/enquiries", async (req, res) => {
  console.log("📨 Received enquiry request");
  
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
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
      `.trim(),
      html: `
<h2>New Enquiry Received</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone || "Not provided"}</p>
<p><strong>Subject:</strong> ${subject || "General"}</p>
<h3>Message:</h3>
<p>${message.replace(/\n/g, "<br />")}</p>
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
    res.status(500).json({
      success: false,
      message: "Failed to send your enquiry. Please try again.",
    });
  }
});

const distPath = path.join(__dirname, "Frontend", "dist");
console.log(`📁 Serving static files from: ${distPath}`);

app.use(express.static(distPath));

// Catch-all route for SPA (Express v4 compatible)
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`📍 Frontend: http://localhost:${port}`);
  console.log(`📍 API: http://localhost:${port}/api/health`);
  
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