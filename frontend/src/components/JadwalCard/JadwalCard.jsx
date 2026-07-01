import { Link } from "react-router-dom";
import styles from "./JadwalCard.module.css";

function JadwalCard({ hari, jam, status }) {
  const tersedia = status === "Tersedia";

  return (
    <div className={`${styles.card} ${!tersedia ? styles.cardPenuh : ""}`}>

      {/* Header hari */}
      <div className={styles.cardHeader}>
        <span className={styles.hariIcon}></span>
        <span className={styles.hari}>{hari}</span>
        <span className={`${styles.badge} ${tersedia ? styles.badgeTersedia : styles.badgePenuh}`}>
          {tersedia ? "Tersedia" : "Penuh"}
        </span>
      </div>

      {/* Jam */}
      <div className={styles.jamRow}>
        <span className={styles.jamIcon}></span>
        <div>
          <p className={styles.jamLabel}>Waktu</p>
          <p className={styles.jamValue}>{jam}</p>
        </div>
      </div>

      {/* Durasi */}
      <div className={styles.durasiRow}>
        <span className={styles.durasiTag}>1 jam</span>
        <span className={styles.durasiTag}>Futsal</span>
      </div>

      {/* Action */}
      {tersedia ? (
        <Link to="/booking" className={styles.btnBook}>
          Booking Sekarang →
        </Link>
      ) : (
        <button className={styles.btnDisabled} disabled>
          Slot Tidak Tersedia
        </button>
      )}
    </div>
  );
}

export default JadwalCard;
