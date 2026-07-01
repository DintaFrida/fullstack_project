import styles from "./LapanganCard.module.css";

// Komponen Card untuk satu data lapangan
function LapanganCard({ lapangan }) {
  return (
    <div className={styles.card}>
      <img
        className={styles.card__image}
        src={lapangan.foto || "https://picsum.photos/300/200"}
        alt={lapangan.nama_lapangan}
      />

      <div className={styles.card__body}>
        <h3 className={styles.card__title}>
          {lapangan.nama_lapangan}
        </h3>

        <p className={styles.card__jenis}>
          Jenis: {lapangan.jenis}
        </p>

        <p className={styles.card__harga}>
          Rp {lapangan.harga_per_jam?.toLocaleString("id-ID")} / jam
        </p>

        <p className={styles.card__status}>
          Status:
          <span
            className={
              lapangan.status === "tersedia"
                ? styles.status__tersedia
                : styles.status__penuh
            }
          >
            {" "}
            {lapangan.status}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LapanganCard;