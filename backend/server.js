require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const app     = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth",     require("./routes/authRoutes"));
app.use("/api/booking",  require("./routes/bookingRoutes"));
app.use("/api/lapangan", require("./routes/lapanganRoutes")); 
app.use("/api/jadwal",   require("./routes/jadwalRoutes"));  
app.use("/api/users",    require("./routes/userRoutes"));    

app.get("/", (req, res) => {
  res.send("API jalan");
});

app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});