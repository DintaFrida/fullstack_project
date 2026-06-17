require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("../config/db.cjs");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/booking", require("./routes/bookingRoutes"));

app.get("/", (req, res) => {
  res.send("API jalan");
});

app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});