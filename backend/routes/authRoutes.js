const express = require("express");
const router = express.Router();

const { register, login, adminLogin } = require("../controllers/authcontroller");
const { uploadFoto } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const uploadSingleImage = require("../middleware/upload");

router.post("/register", register);
router.post("/login", login);
router.post("/admin/login", adminLogin); // ← tambah ini

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ status: "success", message: "Berhasil akses protected route", user: req.user });
});

router.get("/admin", authMiddleware, authorize("admin"), (req, res) => {
  res.json({ status: "success", message: "Selamat datang admin" });
});

router.post("/upload-foto", authMiddleware, uploadSingleImage("foto"), uploadFoto);

module.exports = router;