const router = require('express').Router();
const querySanitize = require('mongo-sanitize');
const User = require('../models/user.model');
const { parseErrors } = require('../utils/utils');

router.get('/:provider', async (req, res) => {
  try {
    let userFound;
    if(req.user){
      userFound = await User
        .findOne({userId: {$eq: req.user.id}, provider: {$eq: querySanitize(req.params.provider)}})
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
