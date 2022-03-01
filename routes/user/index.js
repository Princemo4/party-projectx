const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../../models/user');
const Auth = require('../../middleware/auth');

router.get('/:username', Auth, function (req, res) {
  User.findOne({ _id: res.locals.userId }).populate('organizedEvents').populate('attendingEvents')
    .then(user => {
      res.success(user);
    })
    .catch(err => res.error('Error getting data', null, err));
})

router.put('/:username/edit', Auth, async function (req, res) {
  if (req.params.username !== res.locals.username) {
    return res.error('You are not authorized.', 401, null);
  }

  fieldsToUpdate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  };

 User.findOneAndUpdate({ username: req.params.username }, { $set: { ...fieldsToUpdate }}, {new: true} ,(err, user) => {
    if (err) {
      return res.error('Error updating user', null, err);
    }
    res.success(user);
 })
})

router.get('/:username/my_events', Auth, function (req, res) {
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

router.put('/:username/deactivate', Auth, function (req, res) {
  if (req.params.username !== res.locals.username) {
    return res.error('You are not authorized.', 401, null);
  }
  User.findOneAndUpdate({ username: req.params.username }, { $set: { active: false }}, {new: true} ,(err, user) => {
    if (err) {
      return res.error('Error updating user', null, err);
    }
    res.success(user);
  })
})

router.put('/:username/activate', Auth, function (req, res) {
  if (req.params.username !== res.locals.username) {
    return res.error('You are not authorized.', 401, null);
  }
  User.findOneAndUpdate({ username: req.params.username }, { $set: { active: true }}, {new: true} ,(err, user) => {
    if (err) {
      return res.error('Error updating user', null, err);
    }
    res.success(user);
  })
})

module.exports = router