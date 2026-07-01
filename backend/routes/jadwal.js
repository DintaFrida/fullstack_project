const express = require("express");
const router = express.Router();
const { 
  tambahJadwal, 
  getJadwal, 
  getJadwalById, 
  updateJadwal, 
  deleteJadwal 
} = require("../controllers/jadwalController");

router.post("/", tambahJadwal);       // POST /api/jadwal (Tambah jadwal baru)
router.get("/", getJadwal);           // GET /api/jadwal (Lihat semua jadwal)
router.get("/:id", getJadwalById);    // GET /api/jadwal/:id (Lihat detail jadwal tunggal)
router.put("/:id", updateJadwal);     // PUT /api/jadwal/:id (Ubah data jadwal)
router.delete("/:id", deleteJadwal);  // DELETE /api/jadwal/:id (Hapus jadwal)

module.exports = router;