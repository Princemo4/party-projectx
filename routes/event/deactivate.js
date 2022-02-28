const express = require('express');
const router = express.Router({mergeParams: true});
const Event = require('../../models/event');
const User = require('../../models/user');
const Auth = require('../../middleware/auth');
const mongoose = require('mongoose');


router.put('/:eventId', Auth, async function(req, res){

  const id = new mongoose.Types.ObjectId(req.params.eventId);
  console.log('event id: ', id);
  const event = await Event.findOne({_id: id}).populate("organizer");

  if (event.organizer != res.locals.username) {
    console.log('event.organizer: ', event.organizer);
    console.log('res.locals.username: ', res.locals.username);
    return res.send({error: "you are not the organizer of this event"});
  }
  Event.deactivate(event).then(result => {
    res.send(result)
  }).catch(err => res.send({error: err}))
})

module.exports = router;