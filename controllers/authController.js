const db = require("../config/db.cjs");

// REGISTER
exports.register = (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // Validasi input
    if (!nama || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Semua field wajib diisi"
      });
    }

    if (typeof nama !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        status: "error",
        message: "Input harus berupa string"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "error",
        message: "Password minimal 6 karakter"
      });
    }

    // Cek email sudah ada atau belum
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.log(err);
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

      // Insert user
      const sql = "INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)";

      db.query(sql, [nama, email, password, "user"], (err, insertResult) => {
        if (err) {
          console.log(err);
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
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};


// LOGIN
exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email dan password wajib diisi"
      });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, result) => {
      if (err) {
        console.log(err);
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

      if (user.password !== password) {
        return res.status(401).json({
          status: "error",
          message: "Password salah"
        });
      }

      res.json({
        status: "success",
        message: "Login berhasil",
        data: {
          id_user: user.id_user,
          nama: user.nama,
          email: user.email,
          role: user.role
        }
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};