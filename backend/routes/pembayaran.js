const express = require("express");
const router = express.Router();
const { 
  tambahPembayaran, 
  getPembayaran, 
  updatePembayaran, 
  deletePembayaran 
} = require("../controllers/pembayaranController");

// Semua rute ini otomatis tersambung di bawah prefix /api/pembayaran di server.js
router.post("/", tambahPembayaran);       // POST /api/pembayaran (Tambah transaksi baru)
router.get("/", getPembayaran);           // GET /api/pembayaran (Lihat semua riwayat pembayaran)
router.put("/:id", updatePembayaran);     // PUT /api/pembayaran/:id (Ubah data/status transaksi)
router.delete("/:id", deletePembayaran);  // DELETE /api/pembayaran/:id (Hapus data pembayaran)

module.exports = router;