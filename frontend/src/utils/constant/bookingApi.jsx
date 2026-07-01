import http from "./http";

// Mengambil semua data booking
export function getBooking() {
  return http.get("/booking");
}

// Mengambil booking milik user yang sedang login
export function getBookingByUser() {
  return http.get("/booking/user");
}

// Mengambil booking berdasarkan id
export function getBookingById(id) {
  return http.get(`/booking/${id}`);
}

// Membuat booking baru
export function createBooking(data) {
  return http.post("/booking", data);
}

// Membatalkan booking berdasarkan id
export function deleteBooking(id) {
  return http.delete(`/booking/${id}`);
}
