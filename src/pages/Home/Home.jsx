import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/lapangan?q=${encodeURIComponent(search)}`);
    }
  }

  return (
    <div className={styles.page}>

      {/* Hero dengan background foto lapangan */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>Platform Booking Futsal Online</div>
          <h1 className={styles.heroTitle}>
            Fokus pada Permainan,<br />
            Kami Urus Sisanya.
          </h1>
          <p className={styles.heroDesc}>
            Cari lapangan terbaik, cek jadwal real-time, dan amankan
            slot favoritmu hanya dalam beberapa klik.
          </p>

          {/* Search bar */}
          <form className={styles.searchBar} onSubmit={handleSearch}>
            <span className={styles.searchIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Cari lapangan futsal..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className={styles.searchBtn}>Cari</button>
          </form>

          {/* Quick stats */}
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
        </div>
      </section>

      {/* How it Works */}
      <section className={styles.howSection}>
        <p className={styles.sectionEyebrow}>CARA BOOKING</p>
        <h2 className={styles.sectionTitle}>Mudah dalam 3 Langkah</h2>
        <div className={styles.stepsRow}>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>01</div>
            <h3 className={styles.stepTitle}>Pilih Lapangan</h3>
            <p className={styles.stepDesc}>
              Browsing lapangan yang tersedia, lihat jenis dan harga per jam.
            </p>
          </div>
          <div className={styles.stepArrow}>&#8594;</div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>02</div>
            <h3 className={styles.stepTitle}>Cek Jadwal</h3>
            <p className={styles.stepDesc}>
              Pilih tanggal dan jam yang kosong sesuai keinginanmu.
            </p>
          </div>
          <div className={styles.stepArrow}>&#8594;</div>
          <div className={styles.stepCard}>
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
            <h4 className={styles.featTitle}>Booking Instan</h4>
            <p className={styles.featDesc}>
              Tidak perlu telepon atau datang langsung. Booking online kapan pun.
            </p>
          </div>
          <div className={styles.featCard}>
            <h4 className={styles.featTitle}>Jadwal Real-time</h4>
            <p className={styles.featDesc}>
              Lihat slot yang tersedia dan penuh secara langsung tanpa delay.
            </p>
          </div>
          <div className={styles.featCard}>
            <h4 className={styles.featTitle}>Berbagai Jenis Lapangan</h4>
            <p className={styles.featDesc}>
              Vinyl, sintetis, rumput sintetis — pilih sesuai kebutuhanmu.
            </p>
          </div>
          <div className={styles.featCard}>
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
        <div className={styles.ctaActions}>
          <Link to="/register" className={styles.btnPrimary}>Daftar Gratis</Link>
          <Link to="/lapangan" className={styles.btnOutline}>Lihat Lapangan</Link>
        </div>
      </section>

    </div>
  );
}

export default Home;
