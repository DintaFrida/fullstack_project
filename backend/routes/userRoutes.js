const express = require("express");
const router  = express.Router();
const db      = require("../config/db.cjs");

router.get("/", (req, res) => {
  db.query("SELECT id_user, nama, email FROM users", (err, result) => {
    if (err) return res.status(500).json({ status: "error", message: "Gagal ambil data user" });
    res.json({ status: "success", data: result });
  });
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id_user=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ status: "error", message: "Gagal hapus user" });
    if (result.affectedRows === 0) return res.status(404).json({ status: "error", message: "User tidak ditemukan" });
    res.json({ status: "success", message: "User berhasil dihapus" });
  });
});

module.exports = router;