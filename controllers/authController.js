const db = require("../backend/config/db.cjs");

// REGISTER
exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Data tidak lengkap"
        });
    }

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json({
            message: "User berhasil register",
            id: result.insertId
        });
    });
};

// LOGIN
exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({
                message: "User tidak ditemukan"
            });
        }

        const user = result[0];

        if (password !== user.password) {
            return res.status(401).json({
                message: "Password salah"
            });
        }

        res.json({
            message: "Login berhasil",
            user: user
        });
    });
};