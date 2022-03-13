const User = require('../../models/user.model');

exports.startSession = (createUserDoc, provider) => (
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({userId: {$eq: profile.id}, provider: {$eq: provider}});
      user = createUserDoc(user, profile, provider);
      await user.save();
      done(null, profile);
    } catch(err) {
      done(err);
    }
  }
);

exports.createUserDoc = (user, profile, provider) => {
  if(!user){
    user = new User({
      userId: profile.id,
      email: (profile.emails && profile.emails[0] && profile.emails[0].value) || '',
      photo: profile.photos[0] && profile.photos[0].value,
      displayName: profile.displayName,
      provider,
    });
  } else {
    user.email = (profile.emails && profile.emails[0] && profile.emails[0].value) || '';
    user.displayName = profile.displayName;
    user.photo = profile.photos[0] && profile.photos[0].value;
  }
  return user;
};






