const express = require('express');
const router = express.Router();
const { tambahLapangan, getLapangan } = require('../controllers/lapanganController');

router.post('/', tambahLapangan);
router.get('/', getLapangan);

module.exports = router;