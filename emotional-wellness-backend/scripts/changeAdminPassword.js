/**
 * changeAdminPassword.js
 * Run:  node scripts/changeAdminPassword.js <new_password>
 *
 * Changes the admin password for angelthivi9@gmail.com
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const Admin    = require('../models/Admin');

const ADMIN_EMAIL = 'angelthivi9@gmail.com';
const newPassword = process.argv[2];

if (!newPassword) {
  console.log('❌  Please provide a new password.');
  console.log('Usage: node scripts/changeAdminPassword.js myNewPassword123');
  process.exit(1);
}

async function change() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅  MongoDB connected');

  const admin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (!admin) {
    console.log(`❌  Admin account for ${ADMIN_EMAIL} not found.`);
    await mongoose.disconnect();
    return;
  }

  admin.password = await bcrypt.hash(newPassword, 10);
  await admin.save();

  console.log(`\n🎉  Password updated successfully for ${ADMIN_EMAIL}!`);
  console.log(`    New Password: ${newPassword}`);

  await mongoose.disconnect();
}

change().catch(err => {
  console.error('❌  Failed to change password:', err.message);
  process.exit(1);
});
