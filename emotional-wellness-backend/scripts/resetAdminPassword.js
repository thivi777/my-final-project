/**
 * resetAdminPassword.js
 * Run:  node scripts/resetAdminPassword.js
 *
 * Resets the admin password for angelthivi9@gmail.com to Admin@1234
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const Admin    = require('../models/Admin');

const ADMIN_EMAIL    = 'angelthivi9@gmail.com';
const NEW_PASSWORD   = 'Admin@1234';

async function reset() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅  MongoDB connected');

  const admin = await Admin.findOne({ email: ADMIN_EMAIL });
  if (!admin) {
    // Create fresh
    const hashed = await bcrypt.hash(NEW_PASSWORD, 10);
    await Admin.create({ name: 'Thivi Admin', email: ADMIN_EMAIL, password: hashed, role: 'admin' });
    console.log(`🎉  New admin created for ${ADMIN_EMAIL}`);
  } else {
    admin.password = await bcrypt.hash(NEW_PASSWORD, 10);
    admin.role     = 'admin';
    await admin.save();
    console.log(`🔑  Password reset for ${ADMIN_EMAIL}`);
  }

  console.log(`\n✅  LOGIN DETAILS:`);
  console.log(`    Email    : ${ADMIN_EMAIL}`);
  console.log(`    Password : ${NEW_PASSWORD}`);
  console.log(`    URL      : http://localhost:3000/admin/login`);

  await mongoose.disconnect();
}

reset().catch(err => {
  console.error('❌  Reset failed:', err.message);
  process.exit(1);
});
