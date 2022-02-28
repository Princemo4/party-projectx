const express = require('express');
const router = express.Router({mergeParams: true});
const Event = require('../../models/event');
const User = require('../../models/user');
const Auth = require('../../middleware/auth');
const mongoose = require('mongoose');


router.put('/', Auth, async function(req, res){

  const id = new mongoose.Types.ObjectId(req.params.eventId);
  const event = await Event.findOne({_id: id});

  if (event.organizer.toString() != res.locals.userId) {
    return res.error('You are not the organizer of this event', 401, null);
  }

  event.name = req.body.name || undefined;
  event.description = req.body.description || undefined;
  event.location = req.body.location || undefined;
  event.date = req.body.date || undefined;
  event.price = req.body.price || undefined;
  event.zipcode = req.body.zipcode || undefined;

  event.save()
    .then(async result => {
      res.success('Event updated successfully', result)
    })
    .catch(err => {
      console.log('error saving event: ', err);
      res.error('Error saving event', null, err)
    })

})

module.exports = router;