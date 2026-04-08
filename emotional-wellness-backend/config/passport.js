const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const AppleStrategy = require("passport-apple");

const User = require("../models/User");
const Admin = require("../models/Admin");
 
// List of emails or names that should be granted admin access
const ADMIN_WHITELIST = [
  "angelthivi9@gmail.com", 
  "thiviysa sathananthan"
];

const isWhitelisted = (profile) => {
  const email = profile.emails && profile.emails[0] ? profile.emails[0].value.toLowerCase() : null;
  const name = profile.displayName ? profile.displayName.toLowerCase() : null;
  
  return (email && ADMIN_WHITELIST.includes(email)) || (name && ADMIN_WHITELIST.includes(name));
};

// -------- User Google login --------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
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
            role: isWhitelisted(profile) ? ["user", "admin"] : ["user"]
          });
        } else if (!user.googleId) {
          // If user exists but no googleId, attach it
          user.googleId = profile.id;
          if (isWhitelisted(profile) && !user.role.includes("admin")) {
            user.role.push("admin");
          }
          await user.save();
        } else if (isWhitelisted(profile) && !user.role.includes("admin")) {
          // If user exists and has googleId, but not admin role
          user.role.push("admin");
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

// -------- Admin Google login --------
passport.use(
  "admin-google",
  new GoogleStrategy(
    {
      clientID: process.env.ADMIN_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.ADMIN_GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.ADMIN_GOOGLE_CALLBACK_URL || "/api/admin/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
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
            role: "admin"
          });
        } else if (!admin.googleId) {
          // If admin exists but no googleId, attach it
          admin.googleId = profile.id;
          await admin.save();
        }
        
        admin.isNewAdmin = isNewAdmin;
        done(null, admin);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
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

module.exports = passport;