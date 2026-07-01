const express = require("express");
const router = express.Router();
const uploadSingleImage = require("../middleware/upload");
const userController = require("../controllers/userController");

router.post(
  "/users/:id/upload",
  uploadSingleImage("photo"), // Nama field file di Postman/Frontend
  userController.uploadFoto   // Memanggil fungsi uploadFoto yang ada di userController
);

module.exports = router;