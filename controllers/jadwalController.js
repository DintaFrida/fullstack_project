let jadwal = [];

exports.tambahJadwal = (req, res) => {
    const newJadwal = { id: jadwal.length + 1, ...req.body };
    jadwal.push(newJadwal);
    res.json({ message: "Jadwal ditambahkan (mock)", jadwalId: newJadwal.id });
};

exports.getJadwal = (req, res) => {
    res.json(jadwal);
};