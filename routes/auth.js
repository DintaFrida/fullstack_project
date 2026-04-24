const express = require('express');
const router = express.Router();

// controller
const { register, login } = require('../controllers/authController');

// middleware
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');

// =======================
// AUTH
// =======================
router.post('/register', register);
router.post('/login', login);

// =======================
// PROTECTED
// =======================
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    status: "success",
    message: "Berhasil akses protected route",
    user: req.user
  });
});

// =======================
// ADMIN (WAJIB ADA INI)
// =======================
router.get('/admin', authMiddleware, authorize("admin"), (req, res) => {
  res.json({
    status: "success",
    message: "Selamat datang admin"
  });
});

module.exports = router;