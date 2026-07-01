const db = require("../config/db.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================================
// REGISTER USER / ADMIN
// ==========================================
exports.register = async (req, res) => {
  const { nama, email, password, role } = req.body;

  try {
    // 1. Validasi input sederhana
    if (!nama || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Nama, email, dan password wajib diisi",
      });
    }

    // 2. Cek apakah email sudah terdaftar di database
    const checkEmailSql = "SELECT * FROM users WHERE email = ?";
    db.query(checkEmailSql, [email], async (err, results) => {
      if (err) {
        console.error("ERROR CHECK EMAIL:", err);
        return res.status(500).json({ status: "error", message: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).json({
          status: "error",
          message: "Email sudah digunakan, silakan gunakan email lain",
        });
      }

      // 3. Hash password agar terenkripsi secara aman
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Default role diatur ke 'user' jika tidak diisi oleh client
      const userRole = role || "user";

      // 4. Simpan data user baru ke database
      const insertSql = "INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(insertSql, [nama, email, hashedPassword, userRole], (err, result) => {
        if (err) {
          console.error("ERROR INSERT USER:", err);
          return res.status(500).json({ status: "error", message: "Gagal menyimpan data user" });
        }

        return res.status(201).json({
          status: "success",
          message: "Registrasi berhasil!",
          data: { 
            id: result.insertId, 
            nama, 
            email, 
            role: userRole 
          }
        });
      });
    });
  } catch (error) {
    console.error("ERROR REGISTER SYSTEM:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// ==========================================
// LOGIN USER / ADMIN
// ==========================================
exports.login = (req, res) => {
  const { email, password } = req.body;

  // 1. Validasi input sederhana
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email dan password wajib diisi",
    });
  }

  // 2. Cari user berdasarkan email
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("ERROR LOGIN QUERY:", err);
      return res.status(500).json({ status: "error", message: "Database error" });
    }

    // Jika email tidak ditemukan
    if (results.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "Email atau password salah",
      });
    }

    const user = results[0];

    // 3. Bandingkan password yang diinput dengan password ter-hash di database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Email atau password salah",
      });
    }

    // 4. Jika password cocok, buat JWT Token
    // Payload menyimpan: id_user, nama, email, dan role untuk kebutuhan middleware nanti
    const token = jwt.sign(
      { 
        id: user.id_user, 
        nama: user.nama, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token berlaku selama 1 hari
    );

    // 5. Kirim response sukses beserta tokennya ke client
    return res.json({
      status: "success",
      message: "Login berhasil",
      token: token,
      user: {
        id: user.id_user,
        nama: user.nama,
        email: user.email,
        role: user.role
      }
    });
  });
};