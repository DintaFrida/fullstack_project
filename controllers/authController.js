const db = require("../config/db.cjs");

// REGISTER
exports.register = (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({
        status: "error",
        message: "Username dan password wajib diisi"
      });
    }

    if (typeof username !== "string" || typeof password !== "string") {
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

    // Cek username sudah ada atau belum
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Error cek user"
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          status: "error",
          message: "Username sudah digunakan"
        });
      }

      // Insert user
      const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

      db.query(sql, [username, password], (err, insertResult) => {
        if (err) {
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
            username
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
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({
        status: "error",
        message: "Username dan password wajib diisi"
      });
    }

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], (err, result) => {
      if (err) {
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
          username: user.username
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