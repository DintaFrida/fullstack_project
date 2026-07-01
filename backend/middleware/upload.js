const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ================================================
// 1. VALIDASI TIPE FILE (HANYA MENERIMA GAMBAR)
// ================================================
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;

  // Cek ekstensi file
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  // Cek mimetype file
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    // Mengembalikan error jika format bukan JPG/JPEG/PNG
    cb(new Error("Hanya file gambar JPG/JPEG/PNG yang diperbolehkan!"));
  }
};

// ================================================
// 2. CONFIG STORAGE (MENYIMPAN KE FOLDER PUBLIC/UPLOADS)
// ================================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "public/uploads/";
    
    // Logika otomatis: Bikin folder public/uploads jika belum ada di project
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    cb(null, dir);
  },

  // Rename file otomatis biar unik dan tidak menimpa file lama
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = "photo-" + uniqueSuffix + ext;

    cb(null, filename);
  },
});

// ================================================
// 3. BATAS UKURAN FILE (MAKSIMAL 2MB)
// ================================================
const limits = {
  fileSize: 2 * 1024 * 1024, // 2 MegaBytes
};

// ================================================
// 4. INISIALISASI MULTER
// ================================================
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

// ================================================
// 5. ERROR HANDLER MIDDLEWARE (WRAPPER DINAMIS)
// ================================================
const uploadSingleImage = (fieldName) => {
  return (req, res, next) => {
    const singleUpload = upload.single(fieldName);

    singleUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Menangani error bawaan dari Multer (Contoh: File kebesaran)
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            status: "error",
            message: "Ukuran file terlalu besar. Maksimal adalah 2MB",
          });
        }
        return res.status(400).json({ status: "error", message: err.message });
      } else if (err) {
        // Menangani error dari filter format file di atas
        return res.status(400).json({ status: "error", message: err.message });
      }

      // Jika tidak ada error, lanjut ke controller berikutnya
      next();
    });
  };
};

module.exports = uploadSingleImage;