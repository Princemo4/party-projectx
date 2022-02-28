const express = require('express');
const User = require('../models/user');
const router = express.Router({mergeParams: true});
const {verifyToken, createToken} = require('../helpers/token');

router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.error('username and password are required');
  }

  let {username, password} = req.body;
  User.authenticate(username, password, function(err, user) {
    if (err) {
      return res.error('Error authenticating user',400, err);
    }
    return res.success(user)
  })
})

router.post('/signup', (req, res) => {
  // const token = createToken(req.body.username);
  // token is automatically created in the Mongo User Schema when user is created
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
  })
  user.save()
    .then(user => {
      user.token = undefined // clear the token in the response
      return res.success(user)
    })
    .catch(err => {
      return res.error('Error creating user', null, err)
    })
})

router.get('/tokenInfo', (req, res) => {
  return res.success(verifyToken(req.headers['x-access-token']))
})

module.exports = router;