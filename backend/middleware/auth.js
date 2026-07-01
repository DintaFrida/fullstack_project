const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // ❌ tidak ada header
    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "Token tidak ada"
      });
    }

    // ❌ format salah (harus Bearer token)
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Format token salah (gunakan Bearer token)"
      });
    }

    // ambil token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Token tidak valid"
      });
    }

    // ❗ cek secret (biar ga crash)
    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET tidak ditemukan di .env");
      return res.status(500).json({
        status: "error",
        message: "Server configuration error"
      });
    }

    // verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // simpan user ke request
    req.user = decoded;

    next();

  } catch (error) {
    console.log("ERROR AUTH:", error.message);

    return res.status(403).json({
      status: "error",
      message: "Token tidak valid atau expired"
    });
  }
};