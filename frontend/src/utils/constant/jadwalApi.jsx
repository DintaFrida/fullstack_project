import http from "./http";

// Mengambil semua data jadwal
export function getJadwal() {
  return http.get("/jadwal");
}

// Mengambil jadwal berdasarkan id lapangan
export function getJadwalByLapangan(lapanganId) {
  return http.get(`/jadwal/lapangan/${lapanganId}`);
}