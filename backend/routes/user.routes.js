const router = require('express').Router();
const User = require('../models/user.model');
const { parseErrors } = require('../utils/utils');

router.get('/google', async (req, res) => {
  try {
    let userFound;
    if(req.user){
      userFound = await User
        .findOne({userId: {$eq: req.user.id}, provider: {$eq: 'google'}})
        .select('userId admin displayName photo email');
    }
    if(!userFound) {
      res.json({});
    } else {
      res.json(userFound);
    }
  }
  catch(err) {
    res.status(500).json({ message: parseErrors(err) });
  }
});

module.exports = router;
