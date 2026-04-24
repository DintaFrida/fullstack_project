const express = require('express');
const router = express.Router();

// =======================
// CONTROLLERS
// =======================
const { register, login } = require('../controllers/authController');
const { uploadFoto } = require('../controllers/userController');

// =======================
// MIDDLEWARE
// =======================
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const upload = require('../middleware/upload');

// =======================
// AUTH
// =======================
router.post('/register', register);
router.post('/login', login);

// =======================
// PROTECTED (USER)
// =======================
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    status: "success",
    message: "Berhasil akses protected route",
    user: req.user
  });
});

// =======================
// ADMIN ONLY
// =======================
router.get('/admin', authMiddleware, authorize("admin"), (req, res) => {
  res.json({
    status: "success",
    message: "Selamat datang admin"
  });
});

// =======================
// UPLOAD FOTO
// =======================
router.post(
  '/upload-foto',
  authMiddleware,
  upload.single('foto'),
  uploadFoto
);

module.exports = router;