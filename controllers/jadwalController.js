const db = require("../backend/config/db.cjs");

// ✅ CREATE
exports.tambahJadwal = (req, res) => {
    const { id_lapangan, tanggal, jam_mulai, jam_selesai } = req.body;

    if (!id_lapangan || !tanggal || !jam_mulai || !jam_selesai) {
        return res.status(400).json({
            message: "Data tidak lengkap"
        });
    }

    const sql = `
        INSERT INTO jadwal (id_lapangan, tanggal, jam_mulai, jam_selesai)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [id_lapangan, tanggal, jam_mulai, jam_selesai], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: "Jadwal berhasil ditambahkan",
            id: result.insertId
        });
    });
};

// ✅ READ ALL
exports.getJadwal = (req, res) => {
    db.query("SELECT * FROM jadwal", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

// ✅ READ BY ID
exports.getJadwalById = (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM jadwal WHERE id_jadwal = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "Jadwal tidak ditemukan" });
        }

        res.json(result[0]);
    });
};

// ✅ UPDATE
exports.updateJadwal = (req, res) => {
    const id = req.params.id;
    const { id_lapangan, tanggal, jam_mulai, jam_selesai } = req.body;

    const sql = `
        UPDATE jadwal
        SET id_lapangan = ?, tanggal = ?, jam_mulai = ?, jam_selesai = ?
        WHERE id_jadwal = ?
    `;

    db.query(sql, [id_lapangan, tanggal, jam_mulai, jam_selesai, id], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: "Jadwal berhasil diupdate"
        });
    });
};

// ✅ DELETE
exports.deleteJadwal = (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM jadwal WHERE id_jadwal = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: "Jadwal berhasil dihapus"
        });
    });
};