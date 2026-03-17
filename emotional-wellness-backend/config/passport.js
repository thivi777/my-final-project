const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const Admin = require("../models/Admin");

// -------- User Google login --------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check by googleId OR email
        let user = await User.findOne({
          $or: [
            { googleId: profile.id },
            { email: profile.emails[0].value }
          ]
        });

        if (!user) {
          // If user does not exist, create new
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            role: "user"
          });
        } else if (!user.googleId) {
          // If user exists but no googleId, attach it
          user.googleId = profile.id;
          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// -------- Admin Google login --------
passport.use(
  "google-admin",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_ADMIN_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check by googleId OR email
        let admin = await Admin.findOne({
          $or: [
            { googleId: profile.id },
            { email: profile.emails[0].value }
          ]
        });

        if (!admin) {
          // If admin does not exist, create new
          admin = await Admin.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            role: "admin"
          });
        } else if (!admin.googleId) {
          // If admin exists but no googleId, attach it
          admin.googleId = profile.id;
          await admin.save();
        }

        done(null, admin);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;