const multer = require("multer");
const path = require("path");

// ================================
// 1. VALIDASI TIPE FILE (IMAGE ONLY)
// ================================
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;

  // cek extension
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  // cek mimetype
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Hanya file gambar JPG/JPEG/PNG yang diperbolehkan!"));
  }
};

// ================================
// 2. STORAGE CONFIG (SIMPAN KE FOLDER uploads)
// ================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // rename file otomatis biar tidak overwrite
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = path.extname(file.originalname);
    const filename = "photo-" + uniqueSuffix + ext;

    cb(null, filename);
  },
});

// ================================
// 3. BATAS UKURAN FILE (2MB)
// ================================
const limits = {
  fileSize: 2 * 1024 * 1024, // 2MB
};

// ================================
// 4. INIT MULTER
// ================================
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

// ================================
// 5. ERROR HANDLER MIDDLEWARE
// (biar error multer lebih rapi)
// ================================
const uploadSingleImage = (fieldName) => {
  return (req, res, next) => {
    const singleUpload = upload.single(fieldName);

    singleUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // error dari multer
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: "Ukuran file terlalu besar. Maksimal 2MB",
          });
        }
        return res.status(400).json({ message: err.message });
      } else if (err) {
        // error dari fileFilter
        return res.status(400).json({ message: err.message });
      }

      next();
    });
  };
};

module.exports = uploadSingleImage;