const db = require("../config/db.cjs");

//  CREATE BOOKING
exports.tambahBooking = (req, res) => {
  try {
    const { id_user, id_jadwal, tanggal_booking, status } = req.body;

    // VALIDASI INPUT
    if (!id_user || !id_jadwal || !tanggal_booking || !status) {
      return res.status(400).json({
        status: "error",
        message: "Semua field wajib diisi"
      });
    }

    if (isNaN(id_user) || isNaN(id_jadwal)) {
      return res.status(400).json({
        status: "error",
        message: "ID user dan ID jadwal harus berupa angka"
      });
    }

    //  VALIDASI RELASI USER
    db.query("SELECT * FROM users WHERE id_user = ?", [id_user], (err, userResult) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error cek user"
        });
      }

      if (userResult.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "User tidak ditemukan"
        });
      }

      //  VALIDASI RELASI JADWAL
      db.query("SELECT * FROM jadwal WHERE id_jadwal = ?", [id_jadwal], (err, jadwalResult) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Error cek jadwal"
          });
        }

        if (jadwalResult.length === 0) {
          return res.status(404).json({
            status: "error",
            message: "Jadwal tidak ditemukan"
          });
        }

        //  INSERT BOOKING
        const sql = `
          INSERT INTO booking (id_user, id_jadwal, tanggal_booking, status)
          VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [id_user, id_jadwal, tanggal_booking, status], (err, result) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: "Gagal membuat booking"
            });
          }

          res.status(201).json({
            status: "success",
            message: "Booking berhasil dibuat",
            data: {
              id_booking: result.insertId,
              id_user,
              id_jadwal,
              tanggal_booking,
              status
            }
          });
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


// READ ALL BOOKING (JOIN)
exports.getBooking = (req, res) => {
  try {
    const sql = `
      SELECT b.*, u.nama, j.tanggal, j.jam_mulai, j.jam_selesai
      FROM booking b
      JOIN users u ON b.id_user = u.id_user
      JOIN jadwal j ON b.id_jadwal = j.id_jadwal
    `;

    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal mengambil data booking"
        });
      }

      res.json({
        status: "success",
        message: "Berhasil mengambil data booking",
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