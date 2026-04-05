const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
<<<<<<< HEAD
=======
const FacebookStrategy = require("passport-facebook").Strategy;
const AppleStrategy = require("passport-apple");
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
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
<<<<<<< HEAD
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
=======
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        let user = await User.findOne({
          $or: [
            { googleId: profile.id },
            ...(email ? [{ email: email }] : [])
          ]
        });

        let isNewUser = false;
        if (!user) {
          // If user does not exist, create new
          isNewUser = true;
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: email || `google_${profile.id}@noemail.com`,
            role: ["user"]
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
          });
        } else if (!user.googleId) {
          // If user exists but no googleId, attach it
          user.googleId = profile.id;
          await user.save();
        }

<<<<<<< HEAD
=======
        user.isNewUser = isNewUser;
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
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
<<<<<<< HEAD
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
=======
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        let admin = await Admin.findOne({
          $or: [
            { googleId: profile.id },
            ...(email ? [{ email: email }] : [])
          ]
        });

        let isNewAdmin = false;
        if (!admin) {
          // If admin does not exist, create new
          isNewAdmin = true;
          admin = await Admin.create({
            googleId: profile.id,
            name: profile.displayName,
            email: email || `google_admin_${profile.id}@noemail.com`,
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
            role: "admin"
          });
        } else if (!admin.googleId) {
          // If admin exists but no googleId, attach it
          admin.googleId = profile.id;
          await admin.save();
        }

<<<<<<< HEAD
=======
        admin.isNewUser = isNewAdmin;
>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
        done(null, admin);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

<<<<<<< HEAD
=======
// -------- User Facebook login --------
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'emails']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        let user = await User.findOne({
          $or: [
            { facebookId: profile.id },
            ...(email ? [{ email: email }] : [])
          ]
        });

        let isNewUser = false;
        if (!user) {
          isNewUser = true;
          user = await User.create({
            facebookId: profile.id,
            name: profile.displayName || "Facebook User",
            email: email || `fb_${profile.id}@noemail.com`,
            role: "user"
          });
        } else if (!user.facebookId) {
          user.facebookId = profile.id;
          await user.save();
        }
        
        user.isNewUser = isNewUser;
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// -------- User Apple login --------
passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_SERVICE_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      privateKeyString: process.env.APPLE_PRIVATE_KEY,
      callbackURL: process.env.APPLE_CALLBACK_URL,
      passReqToCallback: true
    },
    async (req, accessToken, refreshToken, idToken, profile, done) => {
      try {
        const email = profile?.email || (req.body && req.body.user ? JSON.parse(req.body.user).email : null);
        const nameObj = profile?.name || (req.body && req.body.user ? JSON.parse(req.body.user).name : null);
        const name = nameObj ? `${nameObj.firstName} ${nameObj.lastName}`.trim() : "Apple User";
        const appleId = profile?.sub || "apple_sub_placeholder";

        let user = await User.findOne({
          $or: [
            { appleId: appleId },
            ...(email ? [{ email: email }] : [])
          ]
        });

        let isNewUser = false;
        if (!user) {
          isNewUser = true;
          user = await User.create({
            appleId: appleId,
            name: name,
            email: email || `apple_${appleId}@noemail.com`,
            role: "user"
          });
        } else if (!user.appleId) {
          user.appleId = appleId;
          await user.save();
        }
        
        user.isNewUser = isNewUser;
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

>>>>>>> 1ac43f5 (Initial commit - Fresh and Clean)
module.exports = passport;