require("dotenv").config();
const express = require("express");
const app = express();

// ========================
// CONFIG
// ========================
const PORT = process.env.PORT || 5000;
require("./config/db.cjs");

// ========================
// MIDDLEWARE
// ========================
app.use(express.json());

// akses folder uploads
app.use("/uploads", express.static("uploads"));

// ========================
// IMPORT ROUTES
// ========================
const authRoutes = require("./routes/auth");
const lapanganRoutes = require("./routes/lapangan");
const jadwalRoutes = require("./routes/jadwal");
const bookingRoutes = require("./routes/booking");
const pembayaranRoutes = require("./routes/pembayaran");

// ========================
// REGISTER ROUTES
// ========================
app.use("/api/auth", authRoutes);
app.use("/api/lapangan", lapanganRoutes);
app.use("/api/jadwal", jadwalRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/pembayaran", pembayaranRoutes);

// ========================
// ROOT
// ========================
app.get("/", (req, res) => {
  res.send("Backend Futsal Booking Jalan 🚀");
});

// ========================
// 404 HANDLER
// ========================
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route tidak ditemukan",
  });
});

// ========================
// START SERVER
// ========================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});