require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path"); // <-- Tambahan: Import modul path bawaan Node.js
const app     = express();

// Import Middleware Proteksi
const authMiddleware = require("./middleware/auth");
const authorize = require("./middleware/authorize");

app.use(cors());
app.use(express.json());

// ==============================================================================
// CONFIG PENYAJIAN ASET STATIS (UNTUK AKSES FOTO DARI BROWSER)
// ==============================================================================
// Membuka akses folder "public/uploads" melalui URL "/uploads"
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// --- DAFTAR ROUTE ---

// 1. Rute Publik (Siapa saja bisa akses tanpa login)
app.use("/api/auth", require("./routes/auth"));

// 2. Rute Terproteksi (Harus Login dulu baru bisa akses)
app.use("/api/booking",    authMiddleware, require("./routes/booking"));
app.use("/api/pembayaran", authMiddleware, require("./routes/pembayaran"));
app.use("/api/users",      authMiddleware, require("./routes/api"));    

// 3. Rute Khusus Admin (Harus Login DAN rolenya wajib 'admin')
app.use("/api/lapangan",   authMiddleware, authorize("admin"), require("./routes/lapangan")); 
app.use("/api/jadwal",     authMiddleware, authorize("admin"), require("./routes/jadwal"));  

app.get("/", (req, res) => {
  res.send("API jalan");
});

app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});