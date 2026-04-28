const Booking = require("../models/Booking");

// CREATE
exports.createBooking = async (req, res) => {
  try {
    const { lapangan, tanggal, jam } = req.body;

    if (!lapangan || !tanggal || !jam) {
      return res.json({ msg: "Semua field wajib diisi" });
    }

    const exist = await Booking.findOne({ lapangan, tanggal, jam });

    if (exist) return res.json({ msg: "Jadwal sudah dibooking" });

    const booking = await Booking.create({
      user_id: req.user.id,
      lapangan,
      tanggal,
      jam
    });

    res.json({ msg: "Booking berhasil", booking });
  } catch (err) {
    res.json(err);
  }
};

// GET USER BOOKING
exports.getMyBooking = async (req, res) => {
  const data = await Booking.find({ user_id: req.user.id });
  res.json(data);
};

// DELETE
exports.deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ msg: "Booking dihapus" });
};

// UPDATE
exports.updateBooking = async (req, res) => {
  const data = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(data);
};