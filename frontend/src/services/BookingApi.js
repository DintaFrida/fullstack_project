import api from "./api";

// GET semua booking
export const getBooking = () => {
  return api.get("/booking");
};

// POST booking baru
export const createBooking = (data) => {
  return api.post("/booking", data);
};

// GET booking by id
export const getBookingById = (id) => {
  return api.get(`/booking/${id}`);
};

// UPDATE booking
export const updateBooking = (id, data) => {
  return api.put(`/booking/${id}`, data);
};

// DELETE booking
export const deleteBooking = (id) => {
  return api.delete(`/booking/${id}`);
};