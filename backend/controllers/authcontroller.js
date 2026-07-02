const db = require("../config/db.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================================
// REGISTER USER / ADMIN
// ==========================================
exports.register = async (req, res) => {
  const { nama, email, password, role } = req.body;

  try {
    if (!nama || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Nama, email, dan password wajib diisi",
      });
    }

    const checkEmailSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkEmailSql, [email], async (err, results) => {
      if (err) {
        return res.status(500).json({ status: "error", message: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).json({
          status: "error",
          message: "Email sudah digunakan, silakan gunakan email lain",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userRole = role || "user";

      const insertSql = "INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(insertSql, [nama, email, hashedPassword, userRole], (err, result) => {
        if (err) {
          return res.status(500).json({ status: "error", message: "Gagal menyimpan data user" });
        }

        return res.status(201).json({
          status: "success",
          message: "Registrasi berhasil!",
          data: { id: result.insertId, nama, email, role: userRole }
        });
      });
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// ==========================================
// LOGIN USER
// ==========================================
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email dan password wajib diisi",
    });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "Email atau password salah",
      });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Email atau password salah",
      });
    }

    const token = jwt.sign(
      { id: user.id_user, nama: user.nama, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      status: "success",
      message: "Login berhasil",
      token: token,
      user: { id: user.id_user, nama: user.nama, email: user.email, role: user.role }
    });
  });
};

// ==========================================
// LOGIN ADMIN  ← tambah ini
// ==========================================
exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email dan password wajib diisi",
    });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "Email atau password salah",
      });
    }

    const user = results[0];

    // cek role harus admin
    if (user.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "Akses ditolak, bukan admin",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Email atau password salah",
      });
    }

    const token = jwt.sign(
      { id: user.id_user, nama: user.nama, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      status: "success",
      message: "Login admin berhasil",
      token: token,
      user: { id: user.id_user, nama: user.nama, email: user.email, role: user.role }
    });
  });
};