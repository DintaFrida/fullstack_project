import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { createBooking } from "../../utils/constant/bookingApi";
import { getLapangan } from "../../utils/constant/lapanganApi";
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

function BookingForm() {
  const [searchParams]  = useSearchParams();
  const navigate        = useNavigate();
  const idJadwalFromURL = searchParams.get("id_jadwal");

  const [lapanganList, setLapanganList] = useState([]);
  const [formData, setFormData] = useState({
    nama_pemesan: "",
    tanggal:      "",
    jam:          "",
    id_lapangan:  "",
    id_jadwal:    idJadwalFromURL || "",
    catatan:      "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Ambil daftar lapangan dari API
    getLapangan()
      .then((res) => setLapanganList(res.data.data || res.data))
      .catch((err) => console.error(err));
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  }

  async function handleBooking(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validasi
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
      const idBooking = response.data?.data?.id_booking || response.data?.data?.id || "-";
      setSuccess(`Booking berhasil! ID Booking: ${idBooking}`);

      // Reset form
      setFormData({
        nama_pemesan: "",
        tanggal:      "",
        jam:          "",
        id_lapangan:  "",
        id_jadwal:    "",
        catatan:      "",
      });

      // Redirect ke profile (riwayat booking) setelah 2 detik
      setTimeout(() => navigate("/profile"), 2000);

    } catch (err) {
      const msg = err.response?.data?.message || "Booking gagal. Silakan coba lagi.";
      setError(msg);
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
          <span className={styles.infoLabel}>Pilih tanggal & jam</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Pilih lapangan</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Konfirmasi booking</span>
        </div>
      </div>

      {/* id_jadwal dari URL */}
      {idJadwalFromURL && (
        <div className={styles.jadwalInfo}>
          Slot jadwal terpilih: <strong>#{idJadwalFromURL}</strong>
        </div>
      )}

      {/* Alert */}
      {error   && <div className={styles.alertError}>{error}</div>}
      {success && <div className={styles.alertSuccess}>{success}</div>}

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
            {lapanganList.length === 0 ? (
              <p className={styles.loadingText}>Memuat lapangan...</p>
            ) : (
              lapanganList.map((lap) => (
                <label
                  key={lap.id_lapangan}
                  className={`${styles.lapanganOption} ${
                    formData.id_lapangan === String(lap.id_lapangan)
                      ? styles.lapanganSelected
                      : ""
                  } ${lap.status === "penuh" ? styles.lapanganDisabled : ""}`}
                >
                  <input
                    type="radio"
                    name="id_lapangan"
                    value={lap.id_lapangan}
                    checked={formData.id_lapangan === String(lap.id_lapangan)}
                    onChange={handleChange}
                    disabled={loading || lap.status === "penuh"}
                    className={styles.radioHidden}
                  />
                  <div className={styles.lapanganInfo}>
                    <span className={styles.lapanganLabel}>{lap.nama_lapangan}</span>
                    <span className={styles.lapanganJenis}>{lap.jenis_lapangan}</span>
                  </div>
                  <span className={`${styles.lapanganStatus} ${
                    lap.status === "tersedia" ? styles.statusTersedia : styles.statusPenuh
                  }`}>
                    {lap.status === "tersedia" ? "Tersedia" : "Penuh"}
                  </span>
                </label>
              ))
            )}
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
