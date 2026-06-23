import { useState } from "react";
import JadwalCard from "../../components/JadwalCard/JadwalCard";
import jadwal from "../../utils/jadwal";
import styles from "./Jadwal.module.css";

function Jadwal() {
  const [filter, setFilter] = useState("semua");

  const filtered =
    filter === "semua"
      ? jadwal
      : jadwal.filter((j) => j.status.toLowerCase() === filter);

  const tersedia = jadwal.filter((j) => j.status === "Tersedia").length;
  const penuh = jadwal.filter((j) => j.status === "Sudah Dibooking").length;

  return (
    <div className={styles.page}>

      {/* Hero */}
      <div className={styles.hero}>
        <span className={styles.eyebrow}>JADWAL LAPANGAN</span>
        <h1 className={styles.title}>Cek Slot Waktu</h1>
        <p className={styles.desc}>
          Pilih hari dan jam yang tersedia, lalu langsung booking lapanganmu.
        </p>

        {/* Summary pills */}
        <div className={styles.summaryRow}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryDot} style={{ background: "#2A7A5A" }} />
            <span>{tersedia} slot tersedia</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryItem}>
            <span className={styles.summaryDot} style={{ background: "#8B3A5A" }} />
            <span>{penuh} slot penuh</span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryItem}>
            <span className={styles.summaryDot} style={{ background: "var(--secondary)" }} />
            <span>{jadwal.length} total slot</span>
          </div>
        </div>

        {/* Filter */}
        <div className={styles.filterRow}>
          {[
            { key: "semua", label: "🗓️ Semua" },
            { key: "tersedia", label: "✅ Tersedia" },
            { key: "sudah dibooking", label: "🔴 Sudah Dibooking" },
          ].map((f) => (
            <button
              key={f.key}
              className={`${styles.filterBtn} ${filter === f.key ? styles.filterActive : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Slot Grid */}
      {filtered.length === 0 ? (
        <div className={styles.stateBox}>
          <span>🔍</span>
          <p>Tidak ada slot dengan filter ini.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((item) => (
            <JadwalCard
              key={item.id}
              hari={item.hari}
              jam={item.jam}
              status={item.status}
            />
          ))}
        </div>
      )}

      {/* Legend */}
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotTersedia}`} />
          Tersedia — bisa dibooking
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.dotPenuh}`} />
          Sudah Dibooking — tidak bisa dipilih
        </span>
      </div>

    </div>
  );
}

export default Jadwal;
