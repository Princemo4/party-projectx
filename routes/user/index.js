const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../../models/user');
const Auth = require('../../middleware/auth');
const mongoose = require('mongoose');

router.get('/:username', function (req, res) {
  User.findOne({ _id: req.params.userId }).populate('organizedEvents').populate('attendingEvents')
    .then(user => {
      res.success(user);
    })
    .catch(err => res.error('Error getting data', null, err));
})

router.use('/:username/my_events', Auth, function (req, res) {
  if (req.params.username !== res.locals.username) {
    return res.error('You are not authorized.', 401, null);
  }
  User.findOne({ username: res.locals.username}).populate('organizedEvents').populate('attendingEvents')
    .then(user => {
      organizedEvents = user.organizedEvents;
      attendingEvents = user.attendingEvents;
      res.success({organizedEvents, attendingEvents});
    })
    .catch(err => res.error('Error getting data', null, err));
});

module.exports = router