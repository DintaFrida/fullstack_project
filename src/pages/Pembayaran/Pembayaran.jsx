// ================================================
// FITUR   : Riwayat Pembayaran
// ANGGOTA : Rahwul Ihsan (0110222283)
// FILE    : src/pages/Pembayaran/Pembayaran.jsx
// ================================================

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import http from "../../utils/constant/http";
import styles from "./Pembayaran.module.css";

function Pembayaran() {
  const location    = useLocation();
  const bookingData = location.state ?? null;

  const [metodePembayaran, setMetodePembayaran] = useState("transfer");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);
  const [riwayat, setRiwayat]   = useState([]);
  const [loadingRiwayat, setLoadingRiwayat] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const fetchRiwayat = async () => {
      try {
        const response = await http.get("/pembayaran");
        setRiwayat(response.data.data ?? []);
      } catch {
        // tidak tampilkan error kritis untuk riwayat
      } finally {
        setLoadingRiwayat(false);
      }
    };
    fetchRiwayat();
  }, [token, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        id_booking:        bookingData.id_booking,
        metode_pembayaran: metodePembayaran,
        total_bayar:       bookingData.harga,
        status_pembayaran: "lunas",
      };
      await http.post("/pembayaran", payload);
      setSuccess(true);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Gagal memproses pembayaran. Coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTanggal = (tgl) => {
    if (!tgl) return "-";
    return new Date(tgl).toLocaleDateString("id-ID", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };
  const formatJam = (jam) => jam?.slice(0, 5) ?? "-";

  if (!token) {
    return (
      <div className={styles.stateBox}>
        <span>🔒</span>
        <h2>Login Terlebih Dahulu</h2>
        <p>Kamu perlu login untuk melihat pembayaran.</p>
        <Link to="/login" className={styles.stateBtn}>Login</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <span className={styles.eyebrow}>PEMBAYARAN</span>
        <h1 className={styles.title}>
          {bookingData && !success ? "Selesaikan Pembayaran" : "Riwayat Pembayaran"}
        </h1>
      </div>

      {success && (
        <div className={styles.successCard}>
          <span className={styles.successIcon}>✅</span>
          <h2 className={styles.successTitle}>Pembayaran Berhasil!</h2>
          <p className={styles.successDesc}>
            Booking lapangan kamu sudah terkonfirmasi. Sampai jumpa di lapangan!
          </p>
          <Link to="/" className={styles.stateBtn}>Kembali ke Beranda</Link>
        </div>
      )}

      {bookingData && !success && (
        <div className={styles.payCard}>
          <h2 className={styles.payCardTitle}>📋 Ringkasan Booking</h2>

          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Lapangan</span>
              <span className={styles.summaryValue}>{bookingData.nama_lapangan}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Tanggal</span>
              <span className={styles.summaryValue}>{formatTanggal(bookingData.tanggal)}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Waktu</span>
              <span className={styles.summaryValue}>
                {formatJam(bookingData.jam_mulai)} – {formatJam(bookingData.jam_selesai)}
              </span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Bayar</span>
              <span className={`${styles.summaryValue} ${styles.totalPrice}`}>
                Rp {Number(bookingData.harga).toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.payForm}>
            <label className={styles.payLabel}>Metode Pembayaran</label>
            <div className={styles.methodGrid}>
              {[
                { val: "transfer", icon: "🏦", label: "Transfer Bank" },
                { val: "cash",     icon: "💵", label: "Bayar Tunai" },
                { val: "qris",     icon: "📱", label: "QRIS" },
              ].map((m) => (
                <label
                  key={m.val}
                  className={`${styles.methodOption} ${metodePembayaran === m.val ? styles.methodActive : ""}`}
                >
                  <input
                    type="radio"
                    name="metode"
                    value={m.val}
                    checked={metodePembayaran === m.val}
                    onChange={(e) => setMetodePembayaran(e.target.value)}
                    className={styles.radioHidden}
                  />
                  <span className={styles.methodIcon}>{m.icon}</span>
                  <span className={styles.methodLabel}>{m.label}</span>
                </label>
              ))}
            </div>

            {error && <div className={styles.errorBox}>⚠️ {error}</div>}

            <button type="submit" className={styles.payBtn} disabled={loading}>
              {loading
                ? "⏳ Memproses..."
                : `Bayar Rp ${Number(bookingData.harga).toLocaleString("id-ID")} →`}
            </button>
          </form>
        </div>
      )}

      <div className={styles.riwayatSection}>
        <h2 className={styles.riwayatTitle}>🗂️ Riwayat Pembayaran</h2>

        {loadingRiwayat ? (
          <p className={styles.riwayatEmpty}>Memuat riwayat...</p>
        ) : riwayat.length === 0 ? (
          <p className={styles.riwayatEmpty}>Belum ada riwayat pembayaran.</p>
        ) : (
          <div className={styles.riwayatList}>
            {riwayat.map((item) => (
              <div key={item.id_pembayaran} className={styles.riwayatCard}>
                <div className={styles.riwayatLeft}>
                  <span className={styles.riwayatId}>Booking #{item.id_booking}</span>
                  <span className={styles.riwayatDate}>{formatTanggal(item.tanggal_booking)}</span>
                  <span className={styles.riwayatMetode}>{item.metode_pembayaran?.toUpperCase()}</span>
                </div>
                <div className={styles.riwayatRight}>
                  <span className={styles.riwayatHarga}>
                    Rp {Number(item.total_bayar).toLocaleString("id-ID")}
                  </span>
                  <span className={`${styles.riwayatStatus} ${
                    item.status_pembayaran === "lunas" ? styles.statusLunas : styles.statusPending
                  }`}>
                    {item.status_pembayaran}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pembayaran;