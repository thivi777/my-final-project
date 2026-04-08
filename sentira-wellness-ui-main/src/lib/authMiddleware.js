import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from './db';

// Lazy-load models to avoid duplicate registration
function getUserModel() {
  if (mongoose.models.User) return mongoose.models.User;
  const { Schema } = mongoose;
  const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: [String], enum: ['user', 'admin'], default: ['user'] },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    googleId: { type: String },
    facebookId: { type: String },
    appleId: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    isPremium: { type: Boolean, default: false },
    subscriptionId: { type: String },
    subscriptionStatus: { type: String, enum: ['none', 'active', 'past_due', 'canceled', 'trialing'], default: 'none' }
  }, { timestamps: true });
  return mongoose.model('User', userSchema);
}

function getAdminModel() {
  if (mongoose.models.Admin) return mongoose.models.Admin;
  const { Schema } = mongoose;
  const adminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'admin' },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    googleId: { type: String }
  }, { timestamps: true });
  return mongoose.model('Admin', adminSchema);
}

export async function protect(request) {
  await connectDB();
  const authHeader = request.headers.get('authorization');
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : request.cookies?.get('token')?.value;

  if (!token) {
    return { error: 'Not authorized, no token', status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const User = getUserModel();
    const Admin = getAdminModel();

    let user = await User.findById(decoded.id).select('-password').lean();
    if (!user) {
      user = await Admin.findById(decoded.id).select('-password').lean();
    }

    if (!user) {
      return { error: 'User not found', status: 401 };
    }

    return { user };
  } catch (err) {
    return { error: 'Not authorized, token failed', status: 401 };
  }
}

export function createToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}
