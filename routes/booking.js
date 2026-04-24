const express = require('express');
const router = express.Router();

const {
  tambahBooking,
  getBooking,
  updateBooking,
  deleteBooking
} = require('../controllers/bookingController');

// CREATE
router.post('/', tambahBooking);

// READ
router.get('/', getBooking);

// UPDATE
router.put('/:id', updateBooking);

// DELETE
router.delete('/:id', deleteBooking);

module.exports = router;