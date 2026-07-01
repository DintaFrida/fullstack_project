const express = require("express");
const router = express.Router();

const {
  tambahPembayaran,
  getPembayaran,
  updatePembayaran,
  deletePembayaran
} = require("../controllers/pembayaranController");

router.post("/", tambahPembayaran);
router.get("/", getPembayaran);
router.put("/:id", updatePembayaran);
router.delete("/:id", deletePembayaran); // 🔥 INI PENTING

module.exports = router;