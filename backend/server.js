require("dotenv").config();
const express = require("express");
const db = require("../config/db.cjs");

const app = express();
app.use(express.json());

// routes
app.use("/auth", require("../routes/auth"));
app.use("/booking", require("../routes/booking"));

app.get("/", (req, res) => {
  res.send("API jalan");
});

app.listen(3000, () => {
  console.log("Server jalan di port 3000");
});