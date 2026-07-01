const express = require("express");
const router = express.Router();
const { 
  tambahBooking, 
  getBooking, 
  updateBooking, 
  deleteBooking 
} = require("../controllers/bookingController");

// Semua rute ini otomatis tersambung di bawah prefix /api/booking di server.js
router.post("/", tambahBooking);       // POST /api/booking (Membuat booking baru)
router.get("/", getBooking);           // GET /api/booking (Melihat semua daftar booking)
router.put("/:id", updateBooking);     // PUT /api/booking/:id (Mengubah data booking)
router.delete("/:id", deleteBooking);  // DELETE /api/booking/:id (Menghapus data booking)

module.exports = router;