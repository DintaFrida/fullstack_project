const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  lapangan: String,
  tanggal: String,
  jam: String
});

module.exports = mongoose.model("Booking", bookingSchema);