const db = require("../config/db.cjs");

//  CREATE
exports.tambahLapangan = (req, res) => {
  try {
    const { nama_lapangan, jenis_lapangan, harga_per_jam } = req.body;

    // VALIDASI
    if (!nama_lapangan || !jenis_lapangan || !harga_per_jam) {
      return res.status(400).json({
        status: "error",
        message: "Semua field wajib diisi"
      });
    }

    if (typeof nama_lapangan !== "string" || typeof jenis_lapangan !== "string") {
      return res.status(400).json({
        status: "error",
        message: "Nama dan jenis lapangan harus berupa string"
      });
    }

    if (typeof harga_per_jam !== "number") {
      return res.status(400).json({
        status: "error",
        message: "Harga per jam harus berupa angka"
      });
    }

    const sql = `
      INSERT INTO lapangan (nama_lapangan, jenis_lapangan, harga_per_jam)
      VALUES (?, ?, ?)
    `;

    db.query(sql, [nama_lapangan, jenis_lapangan, harga_per_jam], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal menambahkan lapangan"
        });
      }

      res.status(201).json({
        status: "success",
        message: "Lapangan berhasil ditambahkan",
        data: {
          id_lapangan: result.insertId,
          nama_lapangan,
          jenis_lapangan,
          harga_per_jam
        }
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};


//  READ ALL
exports.getLapangan = (req, res) => {
  try {
    db.query("SELECT * FROM lapangan", (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal mengambil data lapangan"
        });
      }

      res.json({
        status: "success",
        message: "Berhasil mengambil data",
        data: result
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};


//  READ BY ID
exports.getLapanganById = (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "ID tidak valid"
      });
    }

    db.query("SELECT * FROM lapangan WHERE id_lapangan = ?", [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal mengambil data"
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Lapangan tidak ditemukan"
        });
      }

      res.json({
        status: "success",
        message: "Data ditemukan",
        data: result[0]
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};


//  UPDATE
exports.updateLapangan = (req, res) => {
  try {
    const id = req.params.id;
    const { nama_lapangan, jenis_lapangan, harga_per_jam } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "ID tidak valid"
      });
    }

    if (!nama_lapangan || !jenis_lapangan || !harga_per_jam) {
      return res.status(400).json({
        status: "error",
        message: "Semua field wajib diisi"
      });
    }

    const sql = `
      UPDATE lapangan
      SET nama_lapangan = ?, jenis_lapangan = ?, harga_per_jam = ?
      WHERE id_lapangan = ?
    `;

    db.query(sql, [nama_lapangan, jenis_lapangan, harga_per_jam, id], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal update lapangan"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Lapangan tidak ditemukan"
        });
      }

      res.json({
        status: "success",
        message: "Lapangan berhasil diupdate"
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};


//  DELETE
exports.deleteLapangan = (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "ID tidak valid"
      });
    }

    db.query("DELETE FROM lapangan WHERE id_lapangan = ?", [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal menghapus lapangan"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Lapangan tidak ditemukan"
        });
      }

      res.json({
        status: "success",
        message: "Lapangan berhasil dihapus"
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};