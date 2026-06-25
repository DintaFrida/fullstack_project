const express = require("express");
const router  = express.Router();
const { getLapangan, getLapanganById } = require("../controllers/lapanganController");

router.get("/",    getLapangan);
router.get("/:id", getLapanganById);

module.exports = router;