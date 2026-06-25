import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand */}
        <div className={styles.brand}>
          <span className={styles.brandName}>KickOff</span>
          <p className={styles.brandDesc}>
            Platform booking lapangan futsal online. Mudah, cepat,
            dan bisa kapan saja.
          </p>
        </div>

        {/* Nav links */}
        <div className={styles.linkGroup}>
          <span className={styles.linkTitle}>Menu</span>
          <Link to="/"         className={styles.link}>Home</Link>
          <Link to="/lapangan" className={styles.link}>Lapangan</Link>
          <Link to="/jadwal"   className={styles.link}>Jadwal</Link>
          <Link to="/booking"  className={styles.link}>Booking</Link>
        </div>

        {/* Akun */}
        <div className={styles.linkGroup}>
          <span className={styles.linkTitle}>Akun</span>
          <Link to="/profile"  className={styles.link}>Profile</Link>
          <Link to="/login"    className={styles.link}>Masuk</Link>
          <Link to="/register" className={styles.link}>Daftar</Link>
        </div>

      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <span>© {year} KickOff. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
