const express = require("express");
const router = express.Router();

// =======================
// CONTROLLERS
// =======================
const { register, login } = require("../controllers/authController");
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

// Register user
router.post("/register", register);

// Login user
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

// =======================
// UPLOAD FOTO USER (PROTECTED)
// =======================
router.post(
  "/upload-foto",
  authMiddleware,
  uploadSingleImage("foto"), // middleware upload + validation
  uploadFoto
);

module.exports = router;