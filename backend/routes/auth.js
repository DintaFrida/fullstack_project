const express = require("express");
const router = express.Router();

// =======================
// CONTROLLERS
// =======================
const { register, login } = require("../controllers/authController");
const { uploadFoto } = require("../controllers/userController"); // <-- 1. Tambah import ini

// =======================
// MIDDLEWARE
// =======================
const authMiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const uploadSingleImage = require("../middleware/upload"); // <-- 2. Tambah import ini

// =======================
// AUTH ROUTES
// =======================

// Register user / admin
router.post("/register", register);

// Login (Otomatis mendeteksi user atau admin dari database)
router.post("/login", login);

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

// Upload foto profil (Wajib login + Proses file gambar lewat key bernama 'foto')
router.post(
  "/upload-foto",
  authMiddleware,
  uploadSingleImage("foto"), // <-- 3. Saring file gambar dari field "foto" di Postman
  uploadFoto                 // <-- 4. Catat nama filenya ke database MySQL
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