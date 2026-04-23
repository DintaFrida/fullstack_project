const db = require("../config/db.cjs");

// CREATE
exports.tambahJadwal = (req, res) => {
  try {
    const { id_lapangan, tanggal, jam_mulai, jam_selesai } = req.body;

    // Validasi input
    if (!id_lapangan || !tanggal || !jam_mulai || !jam_selesai) {
      return res.status(400).json({
        status: "error",
        message: "Semua field wajib diisi"
      });
    }

    if (isNaN(id_lapangan)) {
      return res.status(400).json({
        status: "error",
        message: "ID lapangan harus berupa angka"
      });
    }

    // Validasi relasi (cek lapangan ada atau tidak)
    db.query("SELECT * FROM lapangan WHERE id_lapangan = ?", [id_lapangan], (err, lapanganResult) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error cek data lapangan"
        });
      }

      if (lapanganResult.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Lapangan tidak ditemukan"
        });
      }

      const sql = `
        INSERT INTO jadwal (id_lapangan, tanggal, jam_mulai, jam_selesai)
        VALUES (?, ?, ?, ?)
      `;

      db.query(sql, [id_lapangan, tanggal, jam_mulai, jam_selesai], (err, result) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Gagal menambahkan jadwal"
          });
        }

        res.status(201).json({
          status: "success",
          message: "Jadwal berhasil ditambahkan",
          data: {
            id_jadwal: result.insertId,
            id_lapangan,
            tanggal,
            jam_mulai,
            jam_selesai
          }
        });
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};


// READ ALL
exports.getJadwal = (req, res) => {
  try {
    const sql = `
      SELECT j.*, l.nama_lapangan
      FROM jadwal j
      JOIN lapangan l ON j.id_lapangan = l.id_lapangan
    `;

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal mengambil data jadwal"
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


// READ BY ID
exports.getJadwalById = (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "ID tidak valid"
      });
    }

    const sql = `
      SELECT j.*, l.nama_lapangan
      FROM jadwal j
      JOIN lapangan l ON j.id_lapangan = l.id_lapangan
      WHERE j.id_jadwal = ?
    `;

    db.query(sql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal mengambil data"
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Jadwal tidak ditemukan"
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


// UPDATE
exports.updateJadwal = (req, res) => {
  try {
    const id = req.params.id;
    const { id_lapangan, tanggal, jam_mulai, jam_selesai } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "ID tidak valid"
      });
    }

    if (!id_lapangan || !tanggal || !jam_mulai || !jam_selesai) {
      return res.status(400).json({
        status: "error",
        message: "Semua field wajib diisi"
      });
    }

    const sql = `
      UPDATE jadwal
      SET id_lapangan = ?, tanggal = ?, jam_mulai = ?, jam_selesai = ?
      WHERE id_jadwal = ?
    `;

    db.query(sql, [id_lapangan, tanggal, jam_mulai, jam_selesai, id], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal update jadwal"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Jadwal tidak ditemukan"
        });
      }

      res.json({
        status: "success",
        message: "Jadwal berhasil diupdate"
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};


// DELETE
exports.deleteJadwal = (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "ID tidak valid"
      });
    }

    db.query("DELETE FROM jadwal WHERE id_jadwal = ?", [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal menghapus jadwal"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Jadwal tidak ditemukan"
        });
      }

      res.json({
        status: "success",
        message: "Jadwal berhasil dihapus"
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};