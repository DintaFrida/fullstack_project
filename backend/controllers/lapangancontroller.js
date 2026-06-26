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

exports.tambahLapangan = (req, res) => {
  const { nama_lapangan, lokasi, harga, foto } = req.body;
  if (!nama_lapangan || !lokasi || !harga) {
    return res.status(400).json({ status: "error", message: "Semua field wajib diisi" });
  }
  db.query(
    "INSERT INTO lapangan (nama_lapangan, lokasi, harga, foto) VALUES (?, ?, ?, ?)",
    [nama_lapangan, lokasi, harga, foto || null],
    (err, result) => {
      if (err) return res.status(500).json({ status: "error", message: "Gagal tambah lapangan" });
      res.status(201).json({ status: "success", message: "Lapangan berhasil ditambahkan", data: { id_lapangan: result.insertId, nama_lapangan, lokasi, harga } });
    }
  );
};

exports.updateLapangan = (req, res) => {
  const { nama_lapangan, lokasi, harga, foto } = req.body;
  db.query(
    "UPDATE lapangan SET nama_lapangan=?, lokasi=?, harga=?, foto=? WHERE id_lapangan=?",
    [nama_lapangan, lokasi, harga, foto || null, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ status: "error", message: "Gagal update lapangan" });
      if (result.affectedRows === 0) return res.status(404).json({ status: "error", message: "Lapangan tidak ditemukan" });
      res.json({ status: "success", message: "Lapangan berhasil diupdate" });
    }
  );
};

exports.deleteLapangan = (req, res) => {
  db.query("DELETE FROM lapangan WHERE id_lapangan=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ status: "error", message: "Gagal hapus lapangan" });
    if (result.affectedRows === 0) return res.status(404).json({ status: "error", message: "Lapangan tidak ditemukan" });
    res.json({ status: "success", message: "Lapangan berhasil dihapus" });
  });
};