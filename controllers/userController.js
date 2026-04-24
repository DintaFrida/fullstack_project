const db = require("../config/db.cjs");

exports.uploadFoto = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "File tidak ada"
      });
    }

    const fileName = req.file.filename;
    const userId = req.user.id;

    const sql = "UPDATE users SET foto = ? WHERE id_user = ?";

    db.query(sql, [fileName, userId], (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal simpan ke database"
        });
      }

      res.json({
        status: "success",
        message: "Upload berhasil",
        file: fileName
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};