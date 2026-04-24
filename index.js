require("dotenv").config();
const express = require('express');
const app = express();
const PORT = 5000;

require('./config/db.cjs');

app.use(express.json());

// ========================
// IMPORT ROUTES (SESUAI FOLDER routes)
// ========================
const authRoutes = require('./routes/auth');
const lapanganRoutes = require('./routes/lapangan');
const jadwalRoutes = require('./routes/jadwal');
const bookingRoutes = require('./routes/booking');
const pembayaranRoutes = require('./routes/pembayaran');

// ========================
// USE ROUTES
// ========================
app.use('/auth', authRoutes);
app.use('/lapangan', lapanganRoutes);
app.use('/jadwal', jadwalRoutes);
app.use('/booking', bookingRoutes);
app.use('/pembayaran', pembayaranRoutes);

// ========================
// ROOT TEST
// ========================
app.get('/', (req, res) => {
    res.send("Backend Futsal Booking Jalan!");
});

// ========================
// 404 HANDLER
// ========================
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Route tidak ditemukan"
    });
});

// ========================
// START SERVER
// ========================
app.listen(PORT, () => {
    console.log(`Server jalan di port ${PORT}`);
});