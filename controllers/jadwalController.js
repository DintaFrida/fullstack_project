let jadwal = [];

// ➕ Tambah Jadwal
exports.tambahJadwal = (req, res) => {
    const { lapangan_id, tanggal, jam_mulai, jam_selesai } = req.body;

    if (!lapangan_id || !tanggal || !jam_mulai || !jam_selesai) {
        return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const newJadwal = {
        id: jadwal.length + 1,
        lapangan_id,
        tanggal,
        jam_mulai,
        jam_selesai
    };

    jadwal.push(newJadwal);

    res.json({
        message: "Jadwal berhasil ditambahkan",
        data: newJadwal
    });
};

// 📄 Get Semua Jadwal
exports.getJadwal = (req, res) => {
    res.json(jadwal);
};