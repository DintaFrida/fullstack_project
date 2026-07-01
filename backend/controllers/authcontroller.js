const db = require("../config/db.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  try {
    const { nama, email, password } = req.body;
    if (!nama || !email || !password) return res.status(400).json({ status: "error", message: "Semua field wajib diisi" });
    if (password.length < 6) return res.status(400).json({ status: "error", message: "Password minimal 6 karakter" });
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json({ status: "error", message: "Database error" });
      if (result.length > 0) return res.status(400).json({ status: "error", message: "Email sudah digunakan" });
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query("INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)", [nama, email, hashedPassword, "user"], (err, insertResult) => {
        if (err) return res.status(500).json({ status: "error", message: "Gagal register user" });
        res.status(201).json({ status: "success", message: "User berhasil register", data: { id_user: insertResult.insertId, nama, email } });
      });
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status: "error", message: "Email dan password wajib diisi" });
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json({ status: "error", message: "Database error" });
      if (result.length === 0) return res.status(404).json({ status: "error", message: "User tidak ditemukan" });
      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ status: "error", message: "Password salah" });
      const token = jwt.sign({ id: user.id_user, email: user.email, role: user.role }, process.env.JWT_SECRET || "secret123", { expiresIn: "1d" });
      res.json({ status: "success", message: "Login berhasil", token, user: { id: user.id_user, nama: user.nama, email: user.email, role: user.role } });
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status: "error", message: "Email dan password wajib diisi" });
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json({ status: "error", message: "Database error" });
      if (result.length === 0) return res.status(404).json({ status: "error", message: "User tidak ditemukan" });
      const user = result[0];
      if (user.role !== "admin") return res.status(403).json({ status: "error", message: "Akses ditolak, bukan admin" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ status: "error", message: "Password salah" });
      const token = jwt.sign({ id: user.id_user, email: user.email, role: user.role }, process.env.JWT_SECRET || "secret123", { expiresIn: "1d" });
      res.json({ status: "success", message: "Login admin berhasil", token, user: { id: user.id_user, nama: user.nama, email: user.email, role: user.role } });
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};