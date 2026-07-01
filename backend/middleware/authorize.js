module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    // Pastikan req.user sudah ada (berkat middleware auth.js sebelumnya)
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "Akses dilarang: Anda tidak memiliki hak akses untuk fitur ini"
      });
    }
    next();
  };
};