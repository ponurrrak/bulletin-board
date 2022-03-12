const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/user.model');
const { startSession } = require('./common');

const createUserDoc = (user, profile) => {
  if(!user){
    user = new User({
      userId: profile.id,
      email: profile.emails[0].value,
      photo: profile.photos[0] && profile.photos[0].value,
      displayName: profile.displayName,
      admin: false,
      provider: 'google',
    });
  } else {
    user.email = profile.emails[0].value;
    user.displayName = profile.displayName;
    user.photo = profile.photos[0] && profile.photos[0].value;
  }
  return user;
};

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  scope: ['email', 'profile'],
}, startSession(createUserDoc, 'google')));

passport.serializeUser((obj, serialize) => {
  serialize(null, obj);
});

passport.deserializeUser((user, deserialize) => {
  deserialize(null, user);
});
