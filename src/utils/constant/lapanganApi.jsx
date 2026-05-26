import http from "./http";

// Mengambil semua data lapangan
export function getLapangan() {
  return http.get("/lapangan");
}

// Mengambil data lapangan berdasarkan id
export function getLapanganById(id) {
  return http.get(`/lapangan/${id}`);
}

// Menambah data lapangan baru (dengan foto)
export function createLapangan(formData) {
  return http.post("/lapangan", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// Mengupdate data lapangan berdasarkan id
export function updateLapangan(id, data) {
  return http.put(`/lapangan/${id}`, data);
}

// Menghapus data lapangan berdasarkan id
export function deleteLapangan(id) {
  return http.delete(`/lapangan/${id}`);
}