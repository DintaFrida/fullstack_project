const router = require("express").Router();

router.use("/", require("./authRoutes"));
router.use("/", require("./bookingRoutes"));

module.exports = router;