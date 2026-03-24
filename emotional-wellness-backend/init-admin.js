const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const createInitialAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const email = 'admin@sentira.com';
    const password = 'adminpassword123';
    const name = 'Super Admin';

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log(`Admin with email ${email} already exists.`);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('-----------------------------------------');
    console.log('Admin account created successfully!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('-----------------------------------------');
    console.log('Please delete this script after use for security.');
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createInitialAdmin();
