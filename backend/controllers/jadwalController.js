const db = require("../config/db.cjs");

exports.tambahJadwal = (req, res) => {
  const { id_lapangan, tanggal, jam_mulai, jam_selesai } = req.body;
  if (!id_lapangan || !tanggal || !jam_mulai || !jam_selesai) {
    return res.status(400).json({ status: "error", message: "Semua field wajib diisi" });
  }
  db.query(
    "INSERT INTO jadwal (id_lapangan, tanggal, jam_mulai, jam_selesai) VALUES (?, ?, ?, ?)",
    [id_lapangan, tanggal, jam_mulai, jam_selesai],
    (err, result) => {
      if (err) return res.status(500).json({ status: "error", message: "Gagal menambahkan jadwal" });
      res.status(201).json({ status: "success", message: "Jadwal berhasil ditambahkan", data: { id_jadwal: result.insertId, id_lapangan, tanggal, jam_mulai, jam_selesai } });
    }
  );
};

exports.getJadwal = (req, res) => {
  const sql = `SELECT j.*, l.nama_lapangan FROM jadwal j JOIN lapangan l ON j.id_lapangan = l.id_lapangan`;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ status: "error", message: "Gagal mengambil data jadwal" });
    res.json({ status: "success", data: result });
  });
};

exports.getJadwalById = (req, res) => {
  const sql = `SELECT j.*, l.nama_lapangan FROM jadwal j JOIN lapangan l ON j.id_lapangan = l.id_lapangan WHERE j.id_jadwal = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ status: "error", message: "Gagal mengambil data" });
    if (result.length === 0) return res.status(404).json({ status: "error", message: "Jadwal tidak ditemukan" });
    res.json({ status: "success", data: result[0] });
  });
};

exports.updateJadwal = (req, res) => {
  const { id_lapangan, tanggal, jam_mulai, jam_selesai } = req.body;
  db.query(
    "UPDATE jadwal SET id_lapangan=?, tanggal=?, jam_mulai=?, jam_selesai=? WHERE id_jadwal=?",
    [id_lapangan, tanggal, jam_mulai, jam_selesai, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ status: "error", message: "Gagal update jadwal" });
      if (result.affectedRows === 0) return res.status(404).json({ status: "error", message: "Jadwal tidak ditemukan" });
      res.json({ status: "success", message: "Jadwal berhasil diupdate" });
    }
  );
};

exports.deleteJadwal = (req, res) => {
  db.query("DELETE FROM jadwal WHERE id_jadwal=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ status: "error", message: "Gagal menghapus jadwal" });
    if (result.affectedRows === 0) return res.status(404).json({ status: "error", message: "Jadwal tidak ditemukan" });
    res.json({ status: "success", message: "Jadwal berhasil dihapus" });
  });
};