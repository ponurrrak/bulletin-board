const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;
const querySanitize = require('mongo-sanitize');

const Post = require('../models/post.model');
const User = require('../models/user.model');
const { savePhoto, completeDocument, parseErrors } = require('../utils/utils');

const noUpdateFields = ['_id', 'version', 'authorId', 'authBy', 'releaseTime', 'photoOriginal', 'photoUploaded', '__v'];

router.get('/', async (req, res) => {
  try {
    const result = await Post
      .find({status: {$eq: 'published'}})
      .select('_id releaseTime title content');
    if(!result) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(result);
    }
  }
  catch(err) {
    res.status(500).json({ message: parseErrors(err) });
  }
});

router.get('/author/:id', async (req, res) => {
  try {
    if(req.user && req.user.id === req.params.id) {
      const result = await Post
        .find({authorId: {$eq: req.params.id}, authBy: {$eq: req.user.provider}})
        .select('_id releaseTime title content');
      if(result) {
        res.json(result);
        return;
      }
    }
    res.status(404).json({ message: 'Not found' });
  } catch(err) {
    res.status(500).json({ message: parseErrors(err) });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let result;
    if(ObjectId.isValid(req.params.id)) {
      result = await Post.findById(querySanitize(req.params.id));
    }
    if(!result) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(result);
    }
  }
  catch(err) {
    res.status(500).json({ message: parseErrors(err) });
  }
});

router.post('/', async (req, res) => {
  try {
    if(req.user) {
      const user = await User.findOne({userId: {$eq: req.user.id}, provider: {$eq: req.user.provider}});
      if(user){
        let newPost = new Post(req.body);
        newPost = savePhoto(newPost, req);
        newPost = completeDocument(newPost, user);
        newPost = await newPost.save();
        res.json({_id: newPost._id});
        return;
      }
    }
    res.status(404).json({ message: 'Not found' });
  }
  catch(err) {
    res.status(500).json({ message: parseErrors(err) });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if(req.user){
      let postToUpdate;
      if(ObjectId.isValid(req.params.id)) {
        postToUpdate = await Post.findById(querySanitize(req.params.id));
        const user = await User.findOne({userId: {$eq: req.user.id}, provider: {$eq: req.user.provider}});
        if(user && postToUpdate && (postToUpdate.authorId === user.userId || user.admin)) {
          for(const field in req.body){
            if(!noUpdateFields.includes(field)){
              postToUpdate[field] = req.body[field];
            }
          }
          postToUpdate = savePhoto(postToUpdate, req);
          postToUpdate = completeDocument(postToUpdate, user, true);
          const postUpdated = await postToUpdate.save();
          res.json({version: postUpdated.version});
          return;
        }
      }
    }
    res.status(404).json({ message: 'Not found' });
  } catch(err) {
    res.status(500).json({ message: parseErrors(err) });
  }
});

module.exports = router;
