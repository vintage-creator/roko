const crypto = require('crypto');

function generateOTP() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

module.exports = generateOTP;