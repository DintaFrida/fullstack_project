const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/booking", require("./bookingRoutes"));

module.exports = router;