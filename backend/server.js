require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const app     = express();

app.use(cors());
app.use(express.json());

// Routes (Disesuaikan 100% dengan isi folder routes kamu)
app.use("/api/auth",       require("./routes/auth"));
app.use("/api/booking",    require("./routes/booking"));
app.use("/api/lapangan",   require("./routes/lapangan")); 
app.use("/api/jadwal",     require("./routes/jadwal"));  
app.use("/api/pembayaran", require("./routes/pembayaran"));

// Mengarahkan rute users ke file api.js yang ada di folder kamu
app.use("/api/users",      require("./routes/api"));    

app.get("/", (req, res) => {
  res.send("API jalan");
});

app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});