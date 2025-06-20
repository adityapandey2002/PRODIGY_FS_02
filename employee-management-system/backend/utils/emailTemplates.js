const passwordResetTemplate = (resetUrl, name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Password Reset</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #007bff; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset Request</h1>
            </div>
            <div class="content">
                <p>Hello ${name},</p>
                <p>You are receiving this email because you (or someone else) has requested a password reset for your Employee Management System account.</p>
                <p>Please click the button below to reset your password:</p>
                <a href="${resetUrl}" class="button">Reset Password</a>
                <p>If you did not request this password reset, please ignore this email and your password will remain unchanged.</p>
                <p><strong>This link will expire in 10 minutes.</strong></p>
            </div>
            <div class="footer">
                <p>Employee Management System</p>
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

const welcomeTemplate = (name, email, tempPassword) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Welcome to Employee Management System</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #28a745; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .credentials { background: white; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Employee Management System</h1>
            </div>
            <div class="content">
                <p>Hello ${name},</p>
                <p>Welcome to the Employee Management System! Your account has been created successfully.</p>
                <div class="credentials">
                    <h3>Your Login Credentials:</h3>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Temporary Password:</strong> ${tempPassword}</p>
                </div>
                <p><strong>Important:</strong> Please change your password after your first login for security purposes.</p>
                <p>You can access the system at: <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}">${process.env.CLIENT_URL || 'http://localhost:3000'}</a></p>
            </div>
            <div class="footer">
                <p>Employee Management System</p>
                <p>This is an automated message, please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

module.exports = {
  passwordResetTemplate,
  welcomeTemplate
};
