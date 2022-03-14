const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { startSession, createUserDoc } = require('./common');

passport.use(new FacebookStrategy({
  clientID: process.env.fbClientID,
  clientSecret: process.env.fbClientSecret,
  callbackURL: process.env.fbCallbackURL,
  profileFields: ['id', 'displayName', 'photos', 'email'],
}, startSession(createUserDoc, 'facebook')));

