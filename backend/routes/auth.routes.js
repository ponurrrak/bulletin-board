const router = require('express').Router();
const passport = require('passport');
const { providers } = require('../config/config');

const initLogin = (req, res, next) => {
  if(!providers.includes(req.params.provider) || (req.user && req.user.provider === req.params.provider)) {
    res.redirect('/');
  } else {
    if(req.user) {
      req.logout();
    }
    passport.authenticate(req.params.provider)(req, res, next);
  }
};

const redirectAfterLogin = (req, res, next) => {
  passport.authenticate(req.params.provider, {
    successRedirect: '/',
    failureRedirect: '/',
  })(req, res, next);
};

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/:provider/callback', redirectAfterLogin);

router.get('/:provider', initLogin);



module.exports = router;
