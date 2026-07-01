const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File harus berupa gambar JPG/JPEG/PNG"), false);
  }
};

const limits = {
  fileSize: 2 * 1024 * 1024, // 2MB
};

module.exports = { fileFilter, limits };