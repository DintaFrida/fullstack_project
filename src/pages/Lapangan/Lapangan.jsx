import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Lapangan.module.css";

function Lapangan() {
  const [lapangan, setLapangan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("semua");

  useEffect(() => {
    setLapangan([
      {
        id_lapangan: 1,
        nama_lapangan: "Lapangan A",
        jenis_lapangan: "Vinyl",
        harga_per_jam: 100000,
        status: "tersedia",
        kapasitas: "10 orang",
        fasilitas: ["Parkir", "Toilet", "Air Minum"],
      },
      {
        id_lapangan: 2,
        nama_lapangan: "Lapangan B",
        jenis_lapangan: "Sintetis",
        harga_per_jam: 120000,
        status: "penuh",
        kapasitas: "10 orang",
        fasilitas: ["Parkir", "Toilet", "Loker"],
      },
      {
        id_lapangan: 3,
        nama_lapangan: "Lapangan C",
        jenis_lapangan: "Rumput Sintetis",
        harga_per_jam: 150000,
        status: "tersedia",
        kapasitas: "12 orang",
        fasilitas: ["Parkir", "Toilet", "Kantin", "Loker"],
      },
    ]);
    setLoading(false);
  }, []);

  const filtered =
    filter === "semua"
      ? lapangan
      : lapangan.filter((l) => l.status === filter);

  if (loading) {
    return (
      <div className={styles.stateBox}>
        <span>⏳</span>
        <p>Memuat data lapangan...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* Hero */}
      <div className={styles.hero}>
        <span className={styles.eyebrow}>SEWA LAPANGAN</span>
        <h1 className={styles.title}>Pilih Lapangan Terbaik</h1>
        <p className={styles.desc}>
          Cek ketersediaan dan booking lapangan futsalmu secara online.
        </p>

        {/* Filter Pills */}
        <div className={styles.filterRow}>
          {["semua", "tersedia", "penuh"].map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "semua" && "🏟️ Semua"}
              {f === "tersedia" && "✅ Tersedia"}
              {f === "penuh" && "🔴 Penuh"}
            </button>
          ))}
          <span className={styles.filterCount}>
            {filtered.length} lapangan
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className={styles.stateBox}>
          <span>🔍</span>
          <p>Tidak ada lapangan dengan filter ini.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((lap) => (
            <div
              key={lap.id_lapangan}
              className={`${styles.card} ${lap.status === "penuh" ? styles.cardDimmed : ""}`}
            >
              {/* Card Image */}
              <div className={styles.cardImg}>
                <span className={styles.cardEmoji}>🏟️</span>
                <span
                  className={`${styles.cardBadge} ${
                    lap.status === "tersedia"
                      ? styles.available
                      : styles.full
                  }`}
                >
                  {lap.status === "tersedia" ? "✅ Tersedia" : "🔴 Penuh"}
                </span>
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <div>
                    <h3 className={styles.cardName}>{lap.nama_lapangan}</h3>
                    <p className={styles.cardType}>
                      <span className={styles.typeTag}>{lap.jenis_lapangan}</span>
                    </p>
                  </div>
                </div>

                {/* Info row */}
                <div className={styles.infoRow}>
                  <span className={styles.infoItem}>👥 {lap.kapasitas}</span>
                  <span className={styles.infoItem}>⏱️ Per jam</span>
                </div>

                {/* Fasilitas */}
                <div className={styles.fasilitasRow}>
                  {lap.fasilitas.map((f) => (
                    <span key={f} className={styles.fasilitasTag}>{f}</span>
                  ))}
                </div>

                {/* Price */}
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Harga</span>
                  <p className={styles.cardPrice}>
                    Rp {Number(lap.harga_per_jam).toLocaleString("id-ID")}
                    <span> / jam</span>
                  </p>
                </div>

                {/* Button */}
                {lap.status === "tersedia" ? (
                  <Link
                    to={`/jadwal/${lap.id_lapangan}`}
                    className={styles.cardBtn}
                  >
                    Lihat Jadwal & Booking →
                  </Link>
                ) : (
                  <button
                    className={`${styles.cardBtn} ${styles.cardBtnDisabled}`}
                    disabled
                  >
                    Tidak Tersedia
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Lapangan;
