const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

// Create a transporter using your Gmail account
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
  secure: true,
  port: 465,
});

// Rest of your email sending logic...

// Define the email options
const mailOptions = {
  from: process.env.GMAIL_USER,
  to: 'sarancode6@gmail.com', // replace with the recipient's email address
  subject: 'Test Email',
  text: 'Hello, this is a test email from Node.js!',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
