const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Traveller = require('../models/Traveller');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          google_id: profile.id,
          username: profile.displayName,
          image: profile.photos[0].value
        };

        try {
          let user = await Traveller.findOne({ where: { google_id: profile.id } });
          if (user) {
            done(null, user);
          } else {
            user = await Traveller.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    Traveller.findByPk(user.id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => done(err));
  });
};
