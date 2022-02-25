const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Auth = require('../../middleware/auth');
const Event = require('../../models/event');
const mongoose = require('mongoose');

router.get('/:userId', function (req, res) {
  User.findOne({ _id: req.params.userId }).populate('organizedEvents').populate('attendingEvents')
    .then(user => {
      res.send(user)
    })
    .catch(err => res.send(err))
})

module.exports = router;