const db = require("../config/db.cjs");

// CREATE
exports.tambahPembayaran = (req, res) => {
  try {
    const { id_booking, metode_pembayaran, jumlah_bayar, status } = req.body;

    // Validasi input
    if (!id_booking || !metode_pembayaran || !jumlah_bayar || !status) {
      return res.status(400).json({
        status: "error",
        message: "Semua field wajib diisi"
      });
    }

    if (isNaN(id_booking) || isNaN(jumlah_bayar)) {
      return res.status(400).json({
        status: "error",
        message: "ID booking dan jumlah bayar harus berupa angka"
      });
    }

    // Validasi relasi (cek booking ada)
    db.query("SELECT * FROM booking WHERE id_booking = ?", [id_booking], (err, bookingResult) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error cek booking"
        });
      }

      if (bookingResult.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Booking tidak ditemukan"
        });
      }

      const sql = `
        INSERT INTO pembayaran (id_booking, metode_pembayaran, jumlah_bayar, status)
        VALUES (?, ?, ?, ?)
      `;

      db.query(sql, [id_booking, metode_pembayaran, jumlah_bayar, status], (err, result) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Gagal menambahkan pembayaran"
          });
        }

        res.status(201).json({
          status: "success",
          message: "Pembayaran berhasil ditambahkan",
          data: {
            id_pembayaran: result.insertId,
            id_booking,
            metode_pembayaran,
            jumlah_bayar,
            status
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


// READ
exports.getPembayaran = (req, res) => {
  try {
    const sql = `
      SELECT p.*, b.tanggal_booking
      FROM pembayaran p
      JOIN booking b ON p.id_booking = b.id_booking
    `;

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal mengambil data pembayaran"
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


// UPDATE
exports.updatePembayaran = (req, res) => {
  try {
    const id = req.params.id;
    const { metode_pembayaran, jumlah_bayar, status } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "ID tidak valid"
      });
    }

    if (!metode_pembayaran || !jumlah_bayar || !status) {
      return res.status(400).json({
        status: "error",
        message: "Semua field wajib diisi"
      });
    }

    const sql = `
      UPDATE pembayaran
      SET metode_pembayaran = ?, jumlah_bayar = ?, status = ?
      WHERE id_pembayaran = ?
    `;

    db.query(sql, [metode_pembayaran, jumlah_bayar, status, id], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal update pembayaran"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Pembayaran tidak ditemukan"
        });
      }

      res.json({
        status: "success",
        message: "Pembayaran berhasil diupdate"
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
exports.deletePembayaran = (req, res) => {
  try {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: "error",
        message: "ID tidak valid"
      });
    }

    db.query("DELETE FROM pembayaran WHERE id_pembayaran = ?", [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal menghapus pembayaran"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Pembayaran tidak ditemukan"
        });
      }

      res.json({
        status: "success",
        message: "Pembayaran berhasil dihapus"
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};