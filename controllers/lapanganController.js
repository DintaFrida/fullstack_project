let lapangan = [];

exports.tambahLapangan = (req, res) => {
    const newLapangan = { id: lapangan.length + 1, ...req.body };
    lapangan.push(newLapangan);
    res.json({ message: "Lapangan ditambahkan (mock)", lapanganId: newLapangan.id });
};

exports.getLapangan = (req, res) => {
    res.json(lapangan);
};