const express = require('express');
const app = express();
const PORT = 5000;

require('./backend/config/db.cjs');

app.use(express.json());

// import routes
const authRoutes = require('./routes/auth');
const lapanganRoutes = require('./routes/lapangan');
const jadwalRoutes = require('./routes/jadwal');
const bookingRoutes = require('./routes/booking');
const pembayaranRoutes = require('./routes/pembayaran');

// use routes
app.use('/auth', authRoutes);
app.use('/lapangan', lapanganRoutes);
app.use('/jadwal', jadwalRoutes);
app.use('/booking', bookingRoutes);
app.use('/pembayaran', pembayaranRoutes);

// root
app.get('/', (req, res) => {
    res.send("Backend Futsal Booking Jalan!");
});

app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));    