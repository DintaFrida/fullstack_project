const db = require("../config/db.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =======================
// REGISTER
// =======================
exports.register = (req, res) => {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Semua field wajib diisi"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "error",
        message: "Password minimal 6 karakter"
      });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.log("ERROR CEK USER:", err);
        return res.status(500).json({
          status: "error",
          message: "Error cek user"
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          status: "error",
          message: "Email sudah digunakan"
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const sql = "INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)";

      db.query(sql, [nama, email, hashedPassword, "user"], (err, insertResult) => {
        if (err) {
          console.log("ERROR INSERT:", err);
          return res.status(500).json({
            status: "error",
            message: "Gagal register user"
          });
        }

        res.status(201).json({
          status: "success",
          message: "User berhasil register",
          data: {
            id_user: insertResult.insertId,
            nama,
            email
          }
        });
      });
    });

  } catch (error) {
    console.log("ERROR REGISTER:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};


// =======================
// LOGIN + JWT
// =======================
exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 DEBUG ENV
    console.log("JWT SECRET:", process.env.JWT_SECRET);

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email dan password wajib diisi"
      });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.status(500).json({
          status: "error",
          message: "Database error"
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "User tidak ditemukan"
        });
      }

      const user = result[0];

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          status: "error",
          message: "Password salah"
        });
      }

      // ❗ CEK SECRET DULU BIAR GA CRASH
      if (!process.env.JWT_SECRET) {
        console.log("JWT SECRET TIDAK ADA!");
        return res.status(500).json({
          status: "error",
          message: "JWT_SECRET belum diset di .env"
        });
      }

      const token = jwt.sign(
        {
          id: user.id_user || user.id,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        status: "success",
        message: "Login berhasil",
        token: token
      });
    });

  } catch (error) {
    console.log("ERROR LOGIN:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};