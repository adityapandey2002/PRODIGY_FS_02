const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// @desc    Logs request to console and file
const logger = (req, res, next) => {
  const logEntry = `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} - ${new Date().toISOString()}`;

  console.log(logEntry);

  // Write to log file
  fs.appendFile(
    path.join(logsDir, 'access.log'),
    logEntry + '\n',
    (err) => {
      if (err) console.error('Error writing to log file:', err);
    }
  );

  next();
};

module.exports = logger;
