let pembayaran = [];

exports.tambahPembayaran = (req, res) => {
    const newPembayaran = { id: pembayaran.length + 1, ...req.body };
    pembayaran.push(newPembayaran);
    res.json({ message: "Pembayaran ditambahkan (mock)", pembayaranId: newPembayaran.id });
};

exports.getPembayaran = (req, res) => {
    res.json(pembayaran);
};