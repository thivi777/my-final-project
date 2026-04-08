/**
 * seedAdmin.js
 * Run:  node scripts/seedAdmin.js
 *
 * Creates the primary admin account for angelthivi9@gmail.com
 * if it does not already exist in the database.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const Admin    = require('../models/Admin');

const ADMIN_EMAIL    = 'angelthivi9@gmail.com';
const ADMIN_NAME     = 'Thivi Admin';
const ADMIN_PASSWORD = 'Admin@1234';   // ← Change this after first login!

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅  MongoDB connected');

  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log(`⚠️   Admin already exists for ${ADMIN_EMAIL}. Skipping.`);
    await mongoose.disconnect();
    return;
  }

  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await Admin.create({
    name:     ADMIN_NAME,
    email:    ADMIN_EMAIL,
    password: hashed,
    role:     'admin',
  });

  console.log(`🎉  Admin created:`);
  console.log(`    Email    : ${ADMIN_EMAIL}`);
  console.log(`    Password : ${ADMIN_PASSWORD}`);
  console.log(`    Role     : admin`);
  console.log(`\n⚠️  Please change the password after first login!`);

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('❌  Seed failed:', err.message);
  process.exit(1);
});
