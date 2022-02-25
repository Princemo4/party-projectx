const express = require('express');
const router = express.Router();
const Event = require('../../models/event');
const User = require('../../models/user');
const Auth = require('../../middleware/auth');
const createEvent = require('./create')
const deleteEvent = require('./delete')
const deactivateEvent = require('./deactivate')
const editEvent = require('./edit')

router.use('/create', createEvent);
router.use('/delete', deleteEvent);
router.use('/deactivate', deactivateEvent);
router.use('/edit', editEvent);
router.use('/attend', require('./attend_event'));

router.get('/', async function (req, res) {
  const events = await Event.find({})
  res.send(events)
})

router.get('/:eventId', async function (req, res) {
  const event = await Event.findOne({ _id: req.params.eventId })
  if (!event) {
    return res.send({ error: 'event not found' })
  }

  res.send(event)
})

module.exports = router;