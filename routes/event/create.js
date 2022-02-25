const express = require('express');
const router = express.Router();
const Event = require('../../models/event');
const User = require('../../models/user');
const Auth = require('../../middleware/auth');


router.post('/', Auth, async function(req, res){
  const user = await User.findOne({username: res.locals.username})

  const event = new Event({
    name: req.body.name,
    description: req.body.description,
    date: Date.parse(req.body.date),
    location: req.body.location,
    price: req.body.price,
    organizer: user,
    zipcode: req.body.zipcode
  });

  try {
    await event.save()
    user.organizedEvents.push(event);
    await user.save()
    res.send(event)
  } catch (error) {
    console.log(error);
    res.send(error)
  }

})

module.exports = router;