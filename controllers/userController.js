const db = require("../config/db.cjs");

// =======================
// UPLOAD FOTO USER
// =======================
exports.uploadFoto = (req, res) => {
  try {
    // cek apakah file ada
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "File tidak ditemukan",
      });
    }

    // ambil nama file hasil upload multer
    const fileName = req.file.filename;

    // ambil id user dari token (authMiddleware)
    const userId = req.user.id;

    // query update foto user
    const sql = "UPDATE users SET foto = ? WHERE id_user = ?";

    db.query(sql, [fileName, userId], (err, result) => {
      if (err) {
        console.log("ERROR UPDATE FOTO:", err);
        return res.status(500).json({
          status: "error",
          message: "Gagal simpan ke database",
        });
      }

      // cek apakah user ditemukan
      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "User tidak ditemukan",
        });
      }

      // sukses
      res.json({
        status: "success",
        message: "Upload berhasil",
        file: fileName,
      });
    });

  } catch (error) {
    console.log("ERROR UPLOAD:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};