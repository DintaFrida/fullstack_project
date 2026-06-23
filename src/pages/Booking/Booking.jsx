
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import http from "../../utils/constant/http";
import styles from "./Booking.module.css";

function Booking() {
  const location              = useLocation();
  const navigate              = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Data jadwal yang dikirim dari halaman Eshi via navigate state
  const jadwalData = location.state ?? null;
  const token      = localStorage.getItem("token");

  const formatTanggal = (tgl) => {
    if (!tgl) return "-";
    return new Date(tgl).toLocaleDateString("id-ID", {
      weekday: "long", day: "2-digit", month: "long", year: "numeric",
    });
  };
  const formatJam = (jam) => jam?.slice(0, 5) ?? "-";

  const handleBooking = async () => {
    setError("");
    setLoading(true);
    try {
      const payload = {
        id_jadwal:       jadwalData.id_jadwal,
        tanggal_booking: new Date().toISOString().split("T")[0],
        status:          "diproses",
      };

      const response = await http.post("/booking", payload);
      const result   = response.data;

      if (result.data) {
        // Kirim data ke halaman Pembayaran (Rahwul) via navigate state
        navigate("/pembayaran", {
          state: {
            id_booking:    result.data.id_booking,
            id_lapangan:   jadwalData.id_lapangan,
            nama_lapangan: jadwalData.nama_lapangan,
            tanggal:       jadwalData.tanggal,
            jam_mulai:     jadwalData.jam_mulai,
            jam_selesai:   jadwalData.jam_selesai,
            harga:         jadwalData.harga,
          },
        });
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Gagal membuat booking. Coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Belum login
  if (!token) {
    return (
      <div className={styles.stateBox}>
        <span>🔒</span>
        <h2>Login Terlebih Dahulu</h2>
        <p>Kamu perlu login untuk melakukan booking.</p>
        <Link to="/login" className={styles.stateBtn}>Login Sekarang</Link>
      </div>
    );
  }

  // Tidak ada data jadwal (akses langsung)
  if (!jadwalData) {
    return (
      <div className={styles.stateBox}>
        <span>📋</span>
        <h2>Pilih Jadwal Terlebih Dahulu</h2>
        <p>Silakan pilih lapangan dan jadwal yang tersedia.</p>
        <Link to="/lapangan" className={styles.stateBtn}>Lihat Lapangan</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/lapangan">Sewa Lapangan</Link>
        <span> / </span>
        <Link to={`/jadwal/${jadwalData.id_lapangan}`}>Jadwal</Link>
        <span> / </span>
        <span>Konfirmasi Booking</span>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>KONFIRMASI PEMESANAN</span>
        <h1 className={styles.title}>Periksa Detail Booking</h1>
        <p className={styles.desc}>
          Pastikan semua informasi sudah benar sebelum konfirmasi.
        </p>
      </div>

      {/* Card Konfirmasi */}
      <div className={styles.confirmCard}>

        <h2 className={styles.detailTitle}>📋 Detail Pemesanan</h2>
        <div className={styles.detailGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Lapangan</span>
            <span className={styles.detailValue}>{jadwalData.nama_lapangan}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Tanggal</span>
            <span className={styles.detailValue}>{formatTanggal(jadwalData.tanggal)}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Jam Mulai</span>
            <span className={styles.detailValue}>{formatJam(jadwalData.jam_mulai)}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Jam Selesai</span>
            <span className={styles.detailValue}>{formatJam(jadwalData.jam_selesai)}</span>
          </div>
        </div>

        {/* Ringkasan harga */}
        <div className={styles.priceSection}>
          <div className={styles.priceRow}>
            <span>Harga Lapangan</span>
            <span>Rp {Number(jadwalData.harga).toLocaleString("id-ID")} / jam</span>
          </div>
          <div className={`${styles.priceRow} ${styles.priceTotal}`}>
            <span>Total Pembayaran</span>
            <span>Rp {Number(jadwalData.harga).toLocaleString("id-ID")}</span>
          </div>
        </div>

        {error && <div className={styles.errorBox}>⚠️ {error}</div>}

        {/* Tombol aksi */}
        <div className={styles.actionRow}>
          <Link to={`/jadwal/${jadwalData.id_lapangan}`} className={styles.btnBack}>
            ← Kembali
          </Link>
          <button
            onClick={handleBooking}
            className={styles.btnConfirm}
            disabled={loading}
          >
            {loading ? "⏳ Memproses..." : "Konfirmasi & Lanjut Bayar →"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Booking;

