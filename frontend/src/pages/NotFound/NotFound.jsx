import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Halaman Tidak Ditemukan</h1>
        <p className={styles.desc}>
          Halaman yang kamu cari tidak ada atau sudah dipindahkan.
          Yuk kembali ke halaman utama!
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.btnPrimary}>Kembali ke Home</Link>
          <Link to="/lapangan" className={styles.btnOutline}>Lihat Lapangan</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
