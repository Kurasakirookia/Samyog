const asyncHandler = require("express-async-handler");
const nodemailer = require('nodemailer');

const sendEmail = asyncHandler(async (req, res) => {
  const { name, email, description } = req.body;

  if (!name || !email || !description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create reusable transporter object using your email service
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use host/port if using other services
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS, // use an App Password if 2FA is enabled
      },
    });

    // Mail options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New message from ${name}`,
      text: description,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully!' });

  } catch (err) {
    console.error('Email sending error:', err);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

module.exports={sendEmail};