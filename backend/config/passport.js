const passport = require("passport");
const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const User = require("../models/User");  // Replace with your user model

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Replace with your JWT secret
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id); // Find user based on payload
      if (user) {
        return done(null, user); // User found, return user
      } else {
        return done(null, false); // No user found, reject
      }
    } catch (error) {
      return done(error, false); // Handle any errors during user lookup
    }
  })
);

module.exports = passport;
