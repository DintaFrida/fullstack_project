import React from 'react';
import styles from './Home.module.css';
// Mengimport gambar langsung agar dijamin terbaca oleh sistem bundler Vite
import lapanganImg from '../../assets/lapangandashboard.jpg';

const Home = () => {
  return (
    <div className={styles.page}>
      {/* 1. HERO SECTION (Gambar lapangan dipasang inline style agar pasti muncul) */}
      <section 
        className={styles.hero} 
        style={{ backgroundImage: `url(${lapanganImg})` }}
      >
        <div className={styles.heroOverlay}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>Platform Booking Futsal Online</div>
          <h1 className={styles.heroTitle}>Fokus pada Permainan,<br />Kami Urus Sisanya.</h1>
          <p className={styles.heroDesc}>
            Cari lapangan terbaik, cek jadwal real-time, dan amankan slot favoritmu hanya dalam beberapa klik.
          </p>

          {/* Search Bar */}
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="Cari lapangan futsal..." 
              className={styles.searchInput} 
            />
            <button className={styles.searchBtn}>Cari</button>
          </div>

          {/* Stats Row */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>3+</span>
              <span className={styles.statLabel}>Lapangan</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Online</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>24/7</span>
              <span className={styles.statLabel}>Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERSECTION GRADIENT SHADOW (Efek dimensi transisi dari gambar ke Navy) */}
      <div className={styles.shadowTransition}></div>

      {/* 2. CARA BOOKING SECTION (Deep Navy & Glassmorphism Card) */}
      <section className={styles.howSection}>
        <div className={styles.sectionEyebrow}>Cara Booking</div>
        <h2 className={styles.sectionTitle}>Mudah dalam 3 Langkah</h2>
        
        <div className={styles.stepsRow}>
          <div className={styles.stepCard}>
            <span className={styles.stepNum}>01</span>
            <h3 className={styles.stepTitle}>Pilih Lapangan</h3>
            <p className={styles.stepDesc}>Browsing lapangan yang tersedia, lihat jenis dan harga per jam.</p>
          </div>

          <div className={styles.stepArrow}>&rarr;</div>

          <div className={styles.stepCard}>
            <span className={styles.stepNum}>02</span>
            <h3 className={styles.stepTitle}>Cek Jadwal</h3>
            <p className={styles.stepDesc}>Pilih tanggal dan jam yang kosong sesuai keinginanmu.</p>
          </div>

          <div className={styles.stepArrow}>&rarr;</div>

          <div className={styles.stepCard}>
            <span className={styles.stepNum}>03</span>
            <h3 className={styles.stepTitle}>Konfirmasi Booking</h3>
            <p className={styles.stepDesc}>Selesaikan booking dan lapangan sudah terjamin untukmu.</p>
          </div>
        </div>
      </section>

      {/* 3. KENAPA KAMI SECTION */}
      <section className={styles.howSection}>
        <div className={styles.sectionEyebrow}>Kenapa Kami</div>
        <h2 className={styles.sectionTitle}>Serba Praktis</h2>
        
        <div className={styles.stepsRow}>
          <div className={styles.stepCard}>
            <h3 className={styles.stepTitle}>Booking Instan</h3>
            <p className={styles.stepDesc}>Tidak perlu telepon atau datang langsung. Booking online kapan pun.</p>
          </div>
          
          <div className={styles.stepCard}>
            <h3 className={styles.stepTitle}>Jadwal Real-time</h3>
            <p className={styles.stepDesc}>Lihat slot yang tersedia dan penuh secara langsung tanpa delay.</p>
          </div>

          <div className={styles.stepCard}>
            <h3 className={styles.stepTitle}>Berbagai Jenis</h3>
            <p className={styles.stepDesc}>Vinyl, sintetis, rumput sintetis — pilih sesuai kebutuhanmu.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;