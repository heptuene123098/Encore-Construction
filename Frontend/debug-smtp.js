import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME || 'info@encoreconstructionltd.org',
    pass: process.env.SMTP_PASSWORD || 'ogll-eimp-eu4n-uuro',
  },
});

transporter.verify()
  .then(() => {
    console.log('VERIFY_OK');
  })
  .catch((err) => {
    console.error('VERIFY_FAIL');
    console.error(err.message);
    console.error(err.stack);
    process.exit(1);
  });
