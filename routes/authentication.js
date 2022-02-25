const express = require('express');
const User = require('../models/user');
const router = express.Router();
const {verifyToken, createToken} = require('../helpers/token');

router.post('/login', (req, res) => {
  username = req.body.username || res.send({ error: 'Please enter a username' });
  password = req.body.password || res.send({ error: 'Please enter a password' });
  User.authenticate(username, password, function(err, user) {
    if(err) {
      res.json({
        status: 'error',
        message: err.message
      })
    } else {
      res.json({
        status: 'success',
        message: 'User logged in',
        user: user
      })
    }
  })
})

router.post('/signup', (req, res) => {
  // const token = createToken(req.body.username);
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