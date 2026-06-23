import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.page}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>⚽ Platform Booking Futsal #1</div>
        <h1 className={styles.heroTitle}>
          Booking Lapangan Futsal<br />
          <span className={styles.heroAccent}>Kapan Saja, Dimana Saja</span>
        </h1>
        <p className={styles.heroDesc}>
          Cari lapangan terbaik, cek jadwal real-time, dan amankan slot
          favoritmu hanya dalam beberapa klik.
        </p>
        <div className={styles.heroActions}>
          <Link to="/lapangan" className={styles.btnPrimary}>
            Cari Lapangan →
          </Link>
          <Link to="/jadwal" className={styles.btnOutline}>
            Lihat Jadwal
          </Link>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statNum}>3+</span>
            <span className={styles.statLabel}>Lapangan</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>Online</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNum}>24/7</span>
            <span className={styles.statLabel}>Booking</span>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className={styles.howSection}>
        <p className={styles.sectionEyebrow}>CARA BOOKING</p>
        <h2 className={styles.sectionTitle}>Mudah dalam 3 Langkah</h2>
        <div className={styles.stepsRow}>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>🔍</div>
            <div className={styles.stepNum}>01</div>
            <h3 className={styles.stepTitle}>Pilih Lapangan</h3>
            <p className={styles.stepDesc}>
              Browsing lapangan yang tersedia, lihat jenis dan harga per jam.
            </p>
          </div>
          <div className={styles.stepArrow}>→</div>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>📅</div>
            <div className={styles.stepNum}>02</div>
            <h3 className={styles.stepTitle}>Cek Jadwal</h3>
            <p className={styles.stepDesc}>
              Pilih tanggal dan jam yang kosong sesuai keinginanmu.
            </p>
          </div>
          <div className={styles.stepArrow}>→</div>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>✅</div>
            <div className={styles.stepNum}>03</div>
            <h3 className={styles.stepTitle}>Konfirmasi Booking</h3>
            <p className={styles.stepDesc}>
              Selesaikan booking dan lapangan sudah terjamin untukmu.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className={styles.featSection}>
        <p className={styles.sectionEyebrow}>KENAPA KAMI</p>
        <h2 className={styles.sectionTitle}>Serba Praktis</h2>
        <div className={styles.featGrid}>
          <div className={styles.featCard}>
            <span className={styles.featEmoji}>⚡</span>
            <h4 className={styles.featTitle}>Booking Instan</h4>
            <p className={styles.featDesc}>
              Tidak perlu telepon atau datang langsung. Booking online kapan pun.
            </p>
          </div>
          <div className={styles.featCard}>
            <span className={styles.featEmoji}>🗓️</span>
            <h4 className={styles.featTitle}>Jadwal Real-time</h4>
            <p className={styles.featDesc}>
              Lihat slot yang tersedia dan penuh secara langsung tanpa delay.
            </p>
          </div>
          <div className={styles.featCard}>
            <span className={styles.featEmoji}>🏟️</span>
            <h4 className={styles.featTitle}>Berbagai Jenis Lapangan</h4>
            <p className={styles.featDesc}>
              Vinyl, sintetis, rumput sintetis — pilih sesuai kebutuhanmu.
            </p>
          </div>
          <div className={styles.featCard}>
            <span className={styles.featEmoji}>🔒</span>
            <h4 className={styles.featTitle}>Slot Terjamin</h4>
            <p className={styles.featDesc}>
              Setelah booking dikonfirmasi, slot lapangan hanya milikmu.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Siap Main Hari Ini?</h2>
        <p className={styles.ctaDesc}>
          Daftar sekarang dan langsung booking lapangan favoritmu.
        </p>
        <div className={styles.heroActions}>
          <Link to="/register" className={styles.btnPrimary}>
            Daftar Gratis
          </Link>
          <Link to="/lapangan" className={styles.btnOutline}>
            Lihat Lapangan
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;
