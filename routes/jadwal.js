const express = require('express');
const router = express.Router();
const { tambahJadwal, getJadwal } = require('../controllers/jadwalController');

router.post('/', tambahJadwal);
router.get('/', getJadwal);

module.exports = router;