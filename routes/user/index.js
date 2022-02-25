const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Auth = require('../../middleware/auth');
const mongoose = require('mongoose');

router.get('/', function (req, res) {

})

router.use('/my_events', require('./my_events'));

module.exports = router