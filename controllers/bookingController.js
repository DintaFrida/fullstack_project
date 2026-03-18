let booking = [];

exports.tambahBooking = (req, res) => {
    const newBooking = { id: booking.length + 1, ...req.body };
    booking.push(newBooking);
    res.json({ message: "Booking berhasil (mock)", bookingId: newBooking.id });
};

exports.getBooking = (req, res) => {
    res.json(booking);
};