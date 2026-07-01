const db = require("../config/db.cjs");

exports.uploadFoto = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: "error", message: "File tidak ditemukan" });
    }

    const fileName = req.file.filename;
    const userId = req.user.id;

    db.query("UPDATE users SET foto = ? WHERE id_user = ?", [fileName, userId], (err, result) => {
      if (err) {
        return res.status(500).json({ status: "error", message: "Gagal simpan ke database" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ status: "error", message: "User tidak ditemukan" });
      }
      res.json({ status: "success", message: "Upload berhasil", file: fileName });
    });

  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.getUsers = (req, res) => {
  db.query("SELECT id_user, nama, email, role FROM users", (err, result) => {
    if (err) return res.status(500).json({ status: "error", message: "Gagal ambil data user" });
    res.json({ status: "success", data: result });
  });
};

exports.deleteUser = (req, res) => {
  db.query("DELETE FROM users WHERE id_user=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ status: "error", message: "Gagal hapus user" });
    if (result.affectedRows === 0) return res.status(404).json({ status: "error", message: "User tidak ditemukan" });
    res.json({ status: "success", message: "User berhasil dihapus" });
  });
};