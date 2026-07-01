const express = require('express');
const router = express.Router();
const jadwalController = require('../controllers/jadwalController');

// CRUD
router.post('/', jadwalController.tambahJadwal);
router.get('/', jadwalController.getJadwal);
router.get('/:id', jadwalController.getJadwalById);
router.put('/:id', jadwalController.updateJadwal);
router.delete('/:id', jadwalController.deleteJadwal);

module.exports = router;