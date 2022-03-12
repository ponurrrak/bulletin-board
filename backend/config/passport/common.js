const User = require('../../models/user.model');

exports.startSession = (createUserDoc, provider) => (
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({userId: {$eq: profile.id}, provider: {$eq: provider}});
      user = createUserDoc(user, profile);
      await user.save();
      done(null, profile);
    } catch(err) {
      done(err);
    }
  }
);






