const router = require("express").Router();

router.use("/auth",     require("./authRoutes"));
router.use("/booking",  require("./bookingRoutes"));
router.use("/lapangan", require("./lapanganRoutes")); // ← tambah ini

module.exports = router;