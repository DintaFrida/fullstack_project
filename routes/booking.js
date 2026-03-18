const express = require('express');
const router = express.Router();
const { tambahBooking, getBooking } = require('../controllers/bookingController');

router.post('/', tambahBooking);
router.get('/', getBooking);

module.exports = router;