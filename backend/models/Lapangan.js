const mongoose = require("mongoose");

const lapanganSchema = new mongoose.Schema({
  nama_lapangan: String,
  lokasi: String,
  harga: Number,
  foto: String,
});

module.exports = mongoose.model("Lapangan", lapanganSchema);