const router = require("express").Router();
const auth = require("../middleware/auth");
const booking = require("../controllers/bookingController");

router.post("/booking", auth, booking.createBooking);
router.get("/my-booking", auth, booking.getMyBooking);
router.delete("/booking/:id", auth, booking.deleteBooking);
router.put("/booking/:id", auth, booking.updateBooking);

module.exports = router;