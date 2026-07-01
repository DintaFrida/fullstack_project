const express = require('express');
const router = express.Router();
const { 
  tambahLapangan, 
  getLapangan, 
  updateLapangan, // <-- 1. Tambah import ini
  deleteLapangan  // <-- 2. Tambah import ini
} = require('../controllers/lapanganController');

router.post('/', tambahLapangan);
router.get('/', getLapangan);

// ==========================================
// RUTE TAMBAHAN (UPDATE & DELETE)
// ==========================================
router.put('/:id', updateLapangan);    // PUT /api/lapangan/:id (Ubah data)
router.delete('/:id', deleteLapangan); // DELETE /api/lapangan/:id (Hapus data)

module.exports = router;