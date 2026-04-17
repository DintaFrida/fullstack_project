const db = require("../config/db.cjs");


// ✅ CREATE
exports.tambahLapangan = (req, res) => {
    const { nama_lapangan, jenis_lapangan, harga_per_jam } = req.body;

    if (!nama_lapangan || !jenis_lapangan || !harga_per_jam) {
        return res.status(400).json({
            status: "error",
            message: "Data tidak lengkap"
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
                message: "Gagal menambahkan lapangan",
                error: err
            });
        }

        res.status(201).json({
            status: "success",
            message: "Lapangan berhasil ditambahkan",
            id: result.insertId
        });
    });
};


// ✅ READ ALL
exports.getLapangan = (req, res) => {
    db.query("SELECT * FROM lapangan", (err, result) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Gagal mengambil data",
                error: err
            });
        }

        res.json({
            status: "success",
            data: result
        });
    });
};


// ✅ READ BY ID
exports.getLapanganById = (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM lapangan WHERE id_lapangan = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Gagal mengambil data",
                error: err
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
            data: result[0]
        });
    });
};


// ✅ UPDATE
exports.updateLapangan = (req, res) => {
    const id = req.params.id;
    const { nama_lapangan, jenis_lapangan, harga_per_jam } = req.body;

    const sql = `
        UPDATE lapangan
        SET nama_lapangan = ?, jenis_lapangan = ?, harga_per_jam = ?
        WHERE id_lapangan = ?
    `;

    db.query(sql, [nama_lapangan, jenis_lapangan, harga_per_jam, id], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Gagal update lapangan",
                error: err
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
};


// ✅ DELETE
exports.deleteLapangan = (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM lapangan WHERE id_lapangan = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Gagal menghapus lapangan",
                error: err
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
};