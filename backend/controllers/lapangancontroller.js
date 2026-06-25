const db = require("../config/db.cjs");

exports.getLapangan = (req, res) => {
  db.query("SELECT * FROM lapangan", (err, result) => {
    if (err) return res.status(500).json({ status: "error", message: "Gagal mengambil data lapangan" });
    res.json({ status: "success", data: result });
  });
};

exports.getLapanganById = (req, res) => {
  db.query("SELECT * FROM lapangan WHERE id_lapangan = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ status: "error", message: "Gagal mengambil data" });
    if (result.length === 0) return res.status(404).json({ status: "error", message: "Lapangan tidak ditemukan" });
    res.json({ status: "success", data: result[0] });
  });
};