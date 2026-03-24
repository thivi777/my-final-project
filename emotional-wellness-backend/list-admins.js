const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const admins = await Admin.find({}, 'name email');
    console.log('Registered Admins:');
    console.log(JSON.stringify(admins, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
