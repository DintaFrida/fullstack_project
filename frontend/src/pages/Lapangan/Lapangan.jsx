import React from 'react';
import styles from './Lapangan.module.css';
// Mengimport gambar home untuk digunakan di header dan kartu lapangan sementara waktu
import lapanganImg from '../../assets/lapangandashboard.jpg'; 

const Lapangan = () => {
  // Data 3 Lapangan sesuai request kamu
  const dataLapangan = [
    {
      id: 1,
      nama: "Lapangan Satar",
      jenis: "Sintetis",
      harga: "Rp 150.000 / Jam",
      status: "Penuh",
      statusClass: styles.statusPenuh
    },
    {
      id: 2,
      nama: "Lapangan Duta",
      jenis: "Vinyl",
      harga: "Rp 130.000 / Jam",
      status: "Tersedia",
      statusClass: styles.statusTersedia
    },
    {
      id: 3,
      nama: "Lapangan ODC",
      jenis: "Sintetis",
      harga: "Rp 160.000 / Jam",
      status: "Penuh",
      statusClass: styles.statusPenuh
    }
  ];

  return (
    <div className={styles.page}>
      {/* 1. HERO HEADER LAPANGAN */}
      <section 
        className={styles.hero} 
        style={{ backgroundImage: `url(${lapanganImg})` }}
      >
        <div className={styles.heroOverlay}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>PLATFORM BOOKING FUTSAL ONLINE</div>
          <h1 className={styles.heroTitle}>Temukan Lapangan Terbaik Anda,<br />Kami Urus Sisanya.</h1>
          <p className={styles.heroDesc}>
            Cek lapangan terbaik, cek jadwal real-time, dan amankan slot favoritmu.
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

          {/* Quick Stats Panel */}
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

      {/* GRADIENT SHADOW TRANSITION */}
      <div className={styles.shadowTransition}></div>

      {/* 2. FILTER & LIST LAPANGAN SECTION */}
      <section className={styles.contentSection}>
        {/* Filter Buttons */}
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <button className={`${styles.filterBtn} ${styles.active}`}>Semua</button>
            <button className={styles.filterBtn}>Sintetis</button>
            <button className={styles.filterBtn}>Vinyl</button>
          </div>
          <span className={styles.resultText}>3 lapangan ditemukan</span>
        </div>

        {/* 3. GRID KARTU LAPANGAN (PRODUK UTAMA) */}
        <div className={styles.lapanganGrid}>
          {dataLapangan.map((lap) => (
            <div key={lap.id} className={styles.lapanganCard}>
              {/* Gambar Lapangan */}
              <div 
                className={styles.cardImage} 
                style={{ backgroundImage: `url(${lapanganImg})` }}
              >
                <span className={`${styles.statusBadge} ${lap.statusClass}`}>
                  {lap.status}
                </span>
              </div>
              
              {/* Info Detail Lapangan */}
              <div className={styles.cardContent}>
                <div className={styles.cardType}>{lap.jenis}</div>
                <h3 className={styles.cardTitle}>{lap.nama}</h3>
                <p className={styles.cardPrice}>{lap.harga}</p>
                
                <button 
                  className={styles.bookBtn}
                  disabled={lap.status === "Penuh"}
                >
                  {lap.status === "Penuh" ? "Sudah Dibooking" : "Sewa Sekarang"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Lapangan;