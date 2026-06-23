import { useState } from "react";
import { createBooking } from "../../services/BookingApi";
import styles from "./BookingForm.module.css";

const JAM_OPTIONS = [
  "07:00 - 08:00",
  "08:00 - 09:00",
  "09:00 - 10:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
];

const LAPANGAN_OPTIONS = [
  { id: 1, label: "Lapangan A — Vinyl" },
  { id: 2, label: "Lapangan B — Sintetis" },
  { id: 3, label: "Lapangan C — Rumput Sintetis" },
];

function BookingForm() {
  const [formData, setFormData] = useState({
    nama_pemesan: "",
    tanggal: "",
    jam: "",
    id_lapangan: "",
    catatan: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  }

  async function handleBooking(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.nama_pemesan.trim()) {
      setError("Nama pemesan wajib diisi.");
      return;
    }
    if (!formData.tanggal) {
      setError("Tanggal booking wajib dipilih.");
      return;
    }
    if (!formData.jam) {
      setError("Jam booking wajib dipilih.");
      return;
    }
    if (!formData.id_lapangan) {
      setError("Lapangan wajib dipilih.");
      return;
    }

    try {
      setLoading(true);
      const response = await createBooking(formData);
      const idBooking = response.data?.data?.id || "-";
      setSuccess(`Booking berhasil! ID Booking: ${idBooking}`);
      setFormData({ nama_pemesan: "", tanggal: "", jam: "", id_lapangan: "", catatan: "" });
    } catch (err) {
      setError("Booking gagal. Silakan coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>

      {/* Info summary */}
      <div className={styles.infoRow}>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}></span>
          <span className={styles.infoLabel}>Pilih tanggal & jam</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}></span>
          <span className={styles.infoLabel}>Pilih lapangan</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}></span>
          <span className={styles.infoLabel}>Konfirmasi booking</span>
        </div>
      </div>

      {/* Alert */}
      {error   && <div className={styles.alertError}>  {error}   </div>}
      {success && <div className={styles.alertSuccess}>{success}  </div>}

      {/* Form */}
      <form onSubmit={handleBooking} className={styles.form}>

        <div className={styles.field}>
          <label className={styles.label}>Nama Pemesan</label>
          <input
            type="text"
            name="nama_pemesan"
            value={formData.nama_pemesan}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
            className={styles.input}
            disabled={loading}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Tanggal Booking</label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className={styles.input}
              disabled={loading}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Jam Booking</label>
            <select
              name="jam"
              value={formData.jam}
              onChange={handleChange}
              className={styles.input}
              disabled={loading}
            >
              <option value="">Pilih jam</option>
              {JAM_OPTIONS.map((j) => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Pilih Lapangan</label>
          <div className={styles.lapanganGrid}>
            {LAPANGAN_OPTIONS.map((lap) => (
              <label
                key={lap.id}
                className={`${styles.lapanganOption} ${
                  formData.id_lapangan === String(lap.id) ? styles.lapanganSelected : ""
                }`}
              >
                <input
                  type="radio"
                  name="id_lapangan"
                  value={lap.id}
                  checked={formData.id_lapangan === String(lap.id)}
                  onChange={handleChange}
                  disabled={loading}
                  className={styles.radioHidden}
                />
                <span className={styles.lapanganIcon}>🏟️</span>
                <span className={styles.lapanganLabel}>{lap.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Catatan <span className={styles.optional}>(opsional)</span>
          </label>
          <textarea
            name="catatan"
            value={formData.catatan}
            onChange={handleChange}
            placeholder="Contoh: minta net dipasang, dll."
            className={`${styles.input} ${styles.textarea}`}
            disabled={loading}
            rows={3}
          />
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
        >
          {loading ? "Memproses..." : "Konfirmasi Booking"}
        </button>

      </form>
    </div>
  );
}

export default BookingForm;
