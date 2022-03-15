const express = require('express');
const router = express.Router({mergeParams: true});
const User = require('../../models/user');
const Auth = require('../../middleware/auth');
const Event = require('../../models/event');
const mongoose = require('mongoose');

router.post('/', Auth, async function (req, res) {
  const event = await Event.findOne({_id: req.params.eventId});
  User.findOne({ username: res.locals.username}).populate('attendingEvents')
    .then(async user => {
      // console.log('current: ' , event)
      // user.attendingEvents.forEach(attendingEvent => {
      //   console.log(attendingEvent === event)
      // })
      if (user.attendingEvents.includes(event)) {
        return res.error('You are already attending this event', 401, null);
      }
      user.attendingEvents.push(event);
      
      if (event.attendees.includes(user)) {
        return res.error('You are already attending this event', 401, null);
      }
      attendee = {
        user: user._id,
        plusOne: req.body.plusOne
      }
      event.attendees.push(attendee);
      await user.save();
      await event.save();
      res.success(true)
    })
    .catch(err => res.send(err))
})

router.put('/removeme', Auth, async function(req, res) {
  const event = await Event.findOne({_id: req.params.eventId}).populate('attendees');
  console.log('event:', event)
  attendee = event.attendees.find(attendee => attendee._id.toString() === res.locals.userId)
  if (!attendee) {
    return res.error('You are not attending this event', 401, null);
  }
  event.attendees = event.attendees.filter(attendee => attendee._id.toString() !== res.locals.userId)
  await event.save();
  return res.success('You have successfully been removed from the event')
})

module.exports = router;