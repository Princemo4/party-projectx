const express = require('express');
const router = express.Router();
const Event = require('../../models/event');
const User = require('../../models/user');
const Auth = require('../../middleware/auth');


router.delete('/:eventId', Auth, async function(req, res){
  const id = new ObjectId(req.params.eventId);
  const event = await Event.findOne({_id: id});
  if (event.organizer.username != res.locals.username) {
    res.send({error: "you are not the organizer of this event"});
  }
  Event.findOneAndDelete({_id: req.params.eventId})
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router;