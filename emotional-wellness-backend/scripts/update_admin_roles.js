const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const updateAdminRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const email = 'angelthivi9@gmail.com';
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`User with email ${email} not found.`);
      process.exit(0);
    }

    if (!user.role.includes('admin')) {
      user.role.push('admin');
      await user.save();
      console.log(`Successfully added 'admin' role to ${email}`);
    } else {
      console.log(`User ${email} already has 'admin' role.`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error updating admin roles:', err);
    process.exit(1);
  }
};

updateAdminRoles();
