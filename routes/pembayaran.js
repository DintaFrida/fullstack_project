const express = require('express');
const router = express.Router();
const { tambahPembayaran, getPembayaran } = require('../controllers/pembayaranController');

router.post('/', tambahPembayaran);
router.get('/', getPembayaran);

module.exports = router;