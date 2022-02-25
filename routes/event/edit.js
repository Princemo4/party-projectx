const express = require('express');
const router = express.Router();
const Event = require('../../models/event');
const User = require('../../models/user');
const Auth = require('../../middleware/auth');
const mongoose = require('mongoose');


router.put('/:eventId', Auth, async function(req, res){

  const id = new mongoose.Types.ObjectId(req.params.eventId);
  const event = await Event.findOne({_id: id}).populate("organizer");

  if (event.organizer.username != res.locals.username) {
    return res.send({error: "you are not the organizer of this event"});
  }

  event.set(req.body);
  event.save()
    .then(result => {
      console.log('saved event: ', result);
      res.send(result)
    })
    .catch(err => {
      console.log('error saving event: ', err);
      res.send(err)
    })

  
})

module.exports = router;