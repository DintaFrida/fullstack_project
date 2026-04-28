require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// koneksi DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// routes
app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.send("API jalan");
});

app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});