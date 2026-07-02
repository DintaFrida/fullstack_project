require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path");
const app     = express();

const authMiddleware = require("./middleware/auth");
const authorize      = require("./middleware/authorize");

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// 1. Rute Publik
app.use("/api/auth",     require("./routes/auth"));
app.use("/api/lapangan", require("./routes/lapangan")); // ← publik, user bisa lihat
app.use("/api/jadwal",   require("./routes/jadwal"));   // ← publik, user bisa lihat

// 2. Rute Terproteksi (harus login)
app.use("/api/booking",    authMiddleware, require("./routes/booking"));
app.use("/api/pembayaran", authMiddleware, require("./routes/pembayaran"));
app.use("/api/users",      authMiddleware, require("./routes/api"));

app.get("/", (req, res) => res.send("API jalan"));

app.listen(3000, () => console.log("Server jalan di port 3000"));