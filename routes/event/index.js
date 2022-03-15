const express = require('express');
const router = express.Router({mergeParams: true});
const Event = require('../../models/event');
const User = require('../../models/user');
const Auth = require('../../middleware/auth');
const createEvent = require('./create')
const deleteEvent = require('./delete')
const deactivateEvent = require('./deactivate')
const editEvent = require('./edit')
const attendEvent = require('./attend_event')

router.use('/create', createEvent);
router.use('/delete', deleteEvent);
router.use('/deactivate', deactivateEvent);
router.use('/:eventId/edit', editEvent);
router.use('/:eventId/attend', attendEvent);


router.get('/', async function (req, res) {
  const events = await Event.find({})
  res.success(events)
})

router.get('/:eventId', async function (req, res) {
  const event = await Event.findOne({ _id: req.params.eventId })
  if (!event) {
    return res.error('Event not found', 404,null)
  }
  res.success(event)
})

module.exports = router;