const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Auth = require('../../middleware/auth');
const Event = require('../../models/event');
const mongoose = require('mongoose');

router.post('/:eventId', Auth, async function (req, res) {
  const eventId = new mongoose.Types.ObjectId(req.params.eventId);
  const event = await Event.findOne(eventId);
  console.log(event);
  User.findOne({ username: req.body.username}).populate('attendingEvents')
    .then(async user => {
      user.attendingEvents.push(event);
      event.attendees.push(user);
      await user.save();
      await event.save();
      res.send(user)
    })
    .catch(err => res.send(err))
})

module.exports = router;