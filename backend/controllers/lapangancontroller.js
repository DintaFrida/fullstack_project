const db = require("../config/db.cjs");

// ==========================================
// 1. TAMBAH LAPANGAN BARU (POST)
// ==========================================
exports.tambahLapangan = (req, res) => {
  try {
    const { nama_lapangan, jenis_rumput, harga_per_jam } = req.body;

    // Validasi input wajib
    if (!nama_lapangan || !jenis_rumput || !harga_per_jam) {
      return res.status(400).json({
        status: "error",
        message: "Semua data lapangan (nama, jenis rumput, harga) wajib diisi!"
      });
    }

    const sql = "INSERT INTO lapangan (nama_lapangan, jenis_rumput, harga_per_jam) VALUES (?, ?, ?)";
    
    db.query(sql, [nama_lapangan, jenis_rumput, harga_per_jam], (err, result) => {
      if (err) {
        console.error("ERROR INSERT LAPANGAN:", err);
        return res.status(500).json({
          status: "error",
          message: "Gagal menyimpan data lapangan ke database."
        });
      }

      res.status(201).json({
        status: "success",
        message: "Lapangan baru berhasil ditambahkan!",
        data: {
          id_lapangan: result.insertId,
          nama_lapangan,
          jenis_rumput,
          harga_per_jam
        }
      });
    });

  } catch (error) {
    console.error("ERROR CONTROLLER LAPANGAN:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error."
    });
  }
};

// ==========================================
// 2. AMBIL SEMUA DATA LAPANGAN (GET)
// ==========================================
exports.getLapangan = (req, res) => {
  try {
    const sql = "SELECT * FROM lapangan";

    db.query(sql, (err, results) => {
      if (err) {
        console.error("ERROR GET LAPANGAN:", err);
        return res.status(500).json({
          status: "error",
          message: "Gagal mengambil data lapangan dari database."
        });
      }

      res.status(200).json({
        status: "success",
        message: "Data lapangan berhasil diambil.",
        data: results
      });
    });

  } catch (error) {
    console.error("ERROR CONTROLLER GET LAPANGAN:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error."
    });
  }
};

// ==========================================
// 3. UBAH DATA LAPANGAN (PUT)
// ==========================================
exports.updateLapangan = (req, res) => {
  try {
    const { id } = req.params; // Mengambil id_lapangan dari parameter URL
    const { nama_lapangan, jenis_rumput, harga_per_jam } = req.body;

    // Validasi input wajib
    if (!nama_lapangan || !jenis_rumput || !harga_per_jam) {
      return res.status(400).json({
        status: "error",
        message: "Semua data lapangan (nama, jenis rumput, harga) wajib diisi untuk update!"
      });
    }

    const sql = "UPDATE lapangan SET nama_lapangan = ?, jenis_rumput = ?, harga_per_jam = ? WHERE id_lapangan = ?";

    db.query(sql, [nama_lapangan, jenis_rumput, harga_per_jam, id], (err, result) => {
      if (err) {
        console.error("ERROR UPDATE LAPANGAN:", err);
        return res.status(500).json({
          status: "error",
          message: "Gagal memperbarui data lapangan di database."
        });
      }

      // Cek apakah data lapangan yang mau di-update terdaftar
      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Data lapangan tidak ditemukan."
        });
      }

      res.status(200).json({
        status: "success",
        message: "Data lapangan berhasil diperbarui!",
        data: {
          id_lapangan: parseInt(id),
          nama_lapangan,
          jenis_rumput,
          harga_per_jam
        }
      });
    });

  } catch (error) {
    console.error("ERROR CONTROLLER UPDATE LAPANGAN:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error."
    });
  }
};

// ==========================================
// 4. HAPUS DATA LAPANGAN (DELETE)
// ==========================================
exports.deleteLapangan = (req, res) => {
  try {
    const { id } = req.params; // Mengambil id_lapangan dari parameter URL

    const sql = "DELETE FROM lapangan WHERE id_lapangan = ?";

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("ERROR DELETE LAPANGAN:", err);
        return res.status(500).json({
          status: "error",
          message: "Gagal menghapus data lapangan dari database."
        });
      }

      // Cek apakah data lapangan yang mau dihapus terdaftar
      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Data lapangan tidak ditemukan."
        });
      }

      res.status(200).json({
        status: "success",
        message: `Lapangan dengan ID ${id} berhasil dihapus.`
      });
    });

  } catch (error) {
    console.error("ERROR CONTROLLER DELETE LAPANGAN:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error."
    });
  }
};