const nodemailer = require('nodemailer');
const { passwordResetTemplate, welcomeTemplate } = require('./emailTemplates');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  let htmlContent = options.html;

  // Use templates for specific email types
  if (options.type === 'passwordReset') {
    htmlContent = passwordResetTemplate(options.resetUrl, options.name);
  } else if (options.type === 'welcome') {
    htmlContent = welcomeTemplate(options.name, options.email, options.tempPassword);
  }

  const message = {
    from: `${process.env.FROM_NAME || 'Employee Management System'} <${process.env.SMTP_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: htmlContent
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
  return info;
};

module.exports = sendEmail;
