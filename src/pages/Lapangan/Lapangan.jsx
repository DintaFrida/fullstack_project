import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Lapangan.module.css";

function Lapangan() {
  const [lapangan, setLapangan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLapangan([
      {
        id_lapangan: 1,
        nama_lapangan: "Lapangan A",
        jenis_lapangan: "Vinyl",
        harga_per_jam: 100000,
        status: "tersedia",
      },
      {
        id_lapangan: 2,
        nama_lapangan: "Lapangan B",
        jenis_lapangan: "Sintetis",
        harga_per_jam: 120000,
        status: "penuh",
      },
      {
        id_lapangan: 3,
        nama_lapangan: "Lapangan C",
        jenis_lapangan: "Rumput Sintetis",
        harga_per_jam: 150000,
        status: "tersedia",
      },
    ]);

    setLoading(false);
  }, []);

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
      <div className={styles.hero}>
        <span className={styles.eyebrow}>SEWA LAPANGAN</span>
        <h1 className={styles.title}>Pilih Lapangan Terbaik</h1>
        <p className={styles.desc}>
          Cek ketersediaan dan booking lapangan secara online.
        </p>
      </div>

      <div className={styles.grid}>
        {lapangan.map((lap) => (
          <div key={lap.id_lapangan} className={styles.card}>
            <div className={styles.cardImg}>
              <span className={styles.cardEmoji}>🏟️</span>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.cardTop}>
                <h3 className={styles.cardName}>
                  {lap.nama_lapangan}
                </h3>

                <span
                  className={`${styles.badge} ${
                    lap.status === "tersedia"
                      ? styles.available
                      : styles.full
                  }`}
                >
                  {lap.status === "tersedia"
                    ? "Tersedia"
                    : "Penuh"}
                </span>
              </div>

              <p className={styles.cardType}>
                {lap.jenis_lapangan}
              </p>

              <p className={styles.cardPrice}>
                Rp{" "}
                {Number(lap.harga_per_jam).toLocaleString(
                  "id-ID"
                )}
                <span> / jam</span>
              </p>

              {lap.status === "tersedia" ? (
                <Link
                  to={`/jadwal/${lap.id_lapangan}`}
                  className={styles.cardBtn}
                >
                  Lihat Jadwal & Booking
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
    </div>
  );
}

export default Lapangan;