import React, { useState } from 'react';
import styles from './Jadwal.module.css';

// Silakan sesuaikan nama file & path gambar background foto lapangan kamu di bawah ini:
import bgFotoLapangan from '../../assets/lapangandashboard.jpg'; 

const Jadwal = () => {
  const [slots, setSlots] = useState([
    { id: 1, hari: "SENIN", waktu: "17:00 - 18:00", info: "1 Jam • Futsal", status: "Tersedia" },
    { id: 2, hari: "SENIN", waktu: "19:00 - 20:00", info: "1 Jam • Futsal", status: "Tersedia" },
    { id: 3, hari: "SELASA", waktu: "19:00 - 20:00", info: "1 Jam • Futsal", status: "Penuh" },
    { id: 4, hari: "SELASA", waktu: "20:00 - 21:00", info: "1 Jam • Futsal", status: "Tersedia" }
  ]);

  const [selectedSlot, setSelectedSlot] = useState(slots[0]);

  return (
    // Memasang background-image langsung ke elemen induk agar foto menutup full ke bawah layar
    <div className={styles.pageContainer} style={{ backgroundImage: `url(${bgFotoLapangan})` }}>
      
      {/* Lapisan Hitam Penggelap Background agar kontras */}
      <div className={styles.darkOverlay}></div>

      {/* Konten Utama berada di dalam wrapper ini */}
      <div className={styles.contentWrapper}>
        
        {/* HEADER HERO */}
        <section className={styles.heroSection}>
          <span className={styles.heroBadge}>SISTEM RESERVASI LIVE</span>
          <h1 className={styles.heroTitle}>Jadwal Booking</h1>
          <p className={styles.heroDesc}>
            Cari waktu senggang pilihanmu, pilih slot yang kosong, dan lakukan pemesanan secara instan.
          </p>
        </section>

        {/* AREA GRIDS */}
        <main className={styles.mainContent}>
          <div className={styles.gridContainer}>
            
            {/* PANEL KIRI: DAFTAR KARTU JADWAL & SKEMA LAPANGAN */}
            <div className={styles.leftMainPanel}>
              <div className={styles.innerFlexContainer}>
                
                {/* Blok Daftar Kartu Slot Jam */}
                <div className={styles.slotsBlock}>
                  <h2 className={styles.panelTitle}>Slot Waktu Tersedia</h2>
                  <div className={styles.timeGrid}>
                    {slots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`
                          ${styles.timeCard} 
                          ${selectedSlot?.id === slot.id ? styles.cardActive : ''} 
                          ${slot.status === 'Penuh' ? styles.cardDisabled : ''}
                        `}
                        onClick={() => slot.status === 'Tersedia' && setSelectedSlot(slot)}
                      >
                        <div className={styles.cardHeader}>
                          <span className={styles.dayTag}>{slot.hari}</span>
                          <span className={`${styles.statusLabel} ${slot.status === 'Tersedia' ? styles.statusGreen : styles.statusRed}`}>
                            {slot.status}
                          </span>
                        </div>
                        <div className={styles.clockTime}>{slot.waktu}</div>
                        <div className={styles.cardFooter}>{slot.info}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sektor Gambar Pola Lapangan Futsal Menggunakan SVG Kode Murni */}
                <div className={styles.tacticalFieldBlock}>
                  <div className={styles.dotPattern}></div>
                  <div className={styles.fieldSvgWrapper}>
                    <svg viewBox="0 0 200 300" className={styles.fieldSvg}>
                      <rect x="10" y="10" width="180" height="280" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" rx="4"/>
                      <line x1="10" y1="150" x2="190" y2="150" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                      <circle cx="100" cy="150" r="30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                      <circle cx="100" cy="150" r="2" fill="rgba(255,255,255,0.4)" />
                      <path d="M 60 10 A 40 40 0 0 0 140 10" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                      <circle cx="100" cy="50" r="1.5" fill="rgba(255,255,255,0.4)" />
                      <rect x="80" y="4" width="40" height="6" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/>
                      <path d="M 60 290 A 40 40 0 0 1 140 290" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
                      <circle cx="100" cy="250" r="1.5" fill="rgba(255,255,255,0.4)" />
                      <rect x="80" y="290" width="40" height="6" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/>
                      <path d="M 10 20 A 10 10 0 0 0 20 10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <path d="M 180 10 A 10 10 0 0 0 190 20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <path d="M 10 280 A 10 10 0 0 1 20 290" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                      <path d="M 180 290 A 10 10 0 0 1 190 280" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>

            {/* PANEL KANAN: RINGKASAN BOOKING DENGAN EMISI EFEK BLUR TRANSPARAN KACA */}
            <div className={styles.rightSidePanel}>
              <div className={styles.glassSummaryCard}>
                <div className={styles.summaryHeader}>
                  <h3 className={styles.summaryTitle}>Ringkasan Booking</h3>
                  <span className={styles.calendarIcon}>📅</span>
                </div>

                <div className={styles.summaryDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Hari:</span>
                    <span className={styles.detailValue}>{selectedSlot.hari}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Waktu:</span>
                    <span className={styles.detailValue}>{selectedSlot.waktu}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Tersedia:</span>
                    <span className={styles.detailValue}>{selectedSlot.status}</span>
                  </div>

                  <button className={styles.actionBtn}>
                    Pilih
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Jadwal;