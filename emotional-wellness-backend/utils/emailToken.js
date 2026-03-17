const crypto = require('crypto');

exports.createEmailToken = () => {
  // Generate a 64-character random token
  return crypto.randomBytes(32).toString('hex');
};