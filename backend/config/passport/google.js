const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { startSession, createUserDoc } = require('./common');

passport.use(new GoogleStrategy({
  clientID: process.env.googleClientID,
  clientSecret: process.env.googleClientSecret,
  callbackURL: process.env.googleCallbackURL,
  scope: ['email', 'profile'],
}, startSession(createUserDoc, 'google')));

