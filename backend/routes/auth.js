const express = require("express");
const router = express.Router();

// =======================
// CONTROLLERS
// =======================
const { register, login, adminLogin } = require("../controllers/authcontroller"); // ← sesuaikan nama file
const { uploadFoto } = require("../controllers/userController");

// =======================
// MIDDLEWARE
// =======================
const authMiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const uploadSingleImage = require("../middleware/upload");

// =======================
// AUTH ROUTES
// =======================

// Register user / admin
router.post("/register", register);

// Login user
router.post("/login", login);

// Login admin ← tambah ini
router.post("/admin/login", adminLogin);

// =======================
// PROTECTED ROUTE (USER)
// =======================
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    status: "success",
    message: "Berhasil akses protected route",
    user: req.user,
  });
});

// Upload foto profil
router.post(
  "/upload-foto",
  authMiddleware,
  uploadSingleImage("foto"),
  uploadFoto
);

// =======================
// ADMIN ONLY ROUTE
// =======================
router.get(
  "/admin",
  authMiddleware,
  authorize("admin"),
  (req, res) => {
    res.json({
      status: "success",
      message: "Selamat datang admin",
    });
  }
);

module.exports = router;