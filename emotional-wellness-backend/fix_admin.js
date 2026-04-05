const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const fixAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const email = 'angelthivi9@gmail.com';
    const password = 'sentira666';
    const name = 'Angel Thivi';

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Create/Update in Admin collection
    let admin = await Admin.findOne({ email });
    if (admin) {
      admin.password = hashedPassword;
      admin.name = name;
      admin.role = 'admin';
      await admin.save();
      console.log(`Updated existing Admin: ${email}`);
    } else {
      admin = new Admin({
        name,
        email,
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log(`Created new Admin: ${email}`);
    }

    // 2. Create/Update in User collection (for shared auth compat)
    let user = await User.findOne({ email });
    if (user) {
      user.password = hashedPassword;
      user.name = name;
      if (!user.role.includes('admin')) {
        user.role.push('admin');
      }
      await user.save();
      console.log(`Updated existing User: ${email}`);
    } else {
      user = new User({
        name,
        email,
        password: hashedPassword,
        role: ['user', 'admin']
      });
      await user.save();
      console.log(`Created new User: ${email}`);
    }

    console.log('-----------------------------------------');
    console.log('Admin account provisioning complete!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('-----------------------------------------');
    process.exit(0);
  } catch (err) {
    console.error('Error fixing admin:', err);
    process.exit(1);
  }
};

fixAdmin();
