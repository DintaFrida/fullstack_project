const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1. Ambil token dari header Authorization (Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "Akses ditolak, token tidak ditemukan"
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Simpan data user dari token ke dalam object request (req.user)
    req.user = decoded; 
    
    // 4. Lanjut ke proses berikutnya
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Token tidak valid atau sudah kedaluwarsa"
    });
  }
};