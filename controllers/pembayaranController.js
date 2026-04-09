const db = require("../backend/config/db.cjs");

// CREATE
exports.tambahPembayaran = (req, res) => {
  const data = req.body;

  db.query("INSERT INTO pembayaran SET ?", data, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Pembayaran berhasil ditambahkan",
      id: result.insertId
    });
  });
};

// READ
exports.getPembayaran = (req, res) => {
  db.query("SELECT * FROM pembayaran", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// 🔥 UPDATE
exports.updatePembayaran = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  db.query(
    "UPDATE pembayaran SET ? WHERE id_pembayaran = ?",
    [data, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Pembayaran berhasil diupdate"
      });
    }
  );
};

// 🔥 DELETE
exports.deletePembayaran = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM pembayaran WHERE id_pembayaran = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Pembayaran berhasil dihapus"
      });
    }
  );
};