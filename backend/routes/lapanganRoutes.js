const express = require("express");
const router  = express.Router();
const {
  getLapangan,
  getLapanganById,
  tambahLapangan,
  updateLapangan,
  deleteLapangan
} = require("../controllers/lapanganController");

router.get("/",       getLapangan);
router.get("/:id",    getLapanganById);
router.post("/",      tambahLapangan);
router.put("/:id",    updateLapangan);
router.delete("/:id", deleteLapangan);

module.exports = router;