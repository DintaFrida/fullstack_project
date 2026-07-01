import React, { useState } from 'react';
import styles from './Booking.module.css';
// Menggunakan gambar lapangan home sebagai latar belakang header agar konsisten
import lapanganImg from '../../assets/lapangandashboard.jpg';

const Booking = () => {
  // Contoh data jadwal/slot waktu yang terstruktur dari screenshot kamu
  const [slotJadwal, setSlotJadwal] = useState([
    {
      id: 1,
      hari: "Senin",
      waktu: "17:00 - 18:00",
      durasi: "1 Jam",
      kategori: "Futsal",
      status: "Tersedia"
    },
    {
      id: 2,
      hari: "Senin",
      waktu: "19:00 - 20:00",
      durasi: "1 Jam",
      kategori: "Futsal",
      status: "Penuh"
    },
    {
      id: 3,
      hari: "Selasa",
      waktu: "20:00 - 21:00",
      durasi: "1 Jam",
      kategori: "Futsal",
      status: "Tersedia"
    }
  ]);

  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className={styles.page}>
      {/* 1. HERO HEADER BOOKING */}
      <section 
        className={styles.hero} 
        style={{ backgroundImage: `url(${lapanganImg})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>SISTEM RESERVASI REAL-TIME</div>
          <h1 className={styles.heroTitle}>Jadwal & Booking Slot</h1>
          <p className={styles.heroDesc}>
            Pilih hari dan jam yang tersedia, lalu kunci slot permainanmu sebelum kehabisan.
          </p>
        </div>
      </section>

      {/* TRANSISI GRADASI DIMENSI */}
      <div className={styles.shadowTransition}></div>

      {/* 2. AREA UTAMA JADWAL */}
      <section className={styles.bookingContainer}>
        <div className={styles.bookingLayout}>
          
          {/* SISI KIRI: DAFTAR SLOT JADWAL */}
          <div className={styles.scheduleSide}>
            <h2 className={styles.sideTitle}>Pilih Slot Waktu</h2>
            
            <div className={styles.slotGrid}>
              {slotJadwal.map((slot) => (
                <div 
                  key={slot.id} 
                  className={`${styles.slotCard} ${selectedSlot?.id === slot.id ? styles.slotSelected : ''} ${slot.status === 'Penuh' ? styles.slotCardDisabled : ''}`}
                  onClick={() => slot.status === 'Tersedia' && setSelectedSlot(slot)}
                >
                  <div className={styles.slotHeader}>
                    <span className={styles.slotDay}>{slot.hari}</span>
                    <span className={`${styles.statusText} ${slot.status === 'Tersedia' ? styles.txtTersedia : styles.txtPenuh}`}>
                      {slot.status}
                    </span>
                  </div>
                  
                  <div className={styles.slotTime}>{slot.waktu}</div>
                  
                  <div className={styles.slotFooter}>
                    <span>{slot.durasi}</span>
                    <span className={styles.dot}>•</span>
                    <span>{slot.kategori}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SISI KANAN: PANEL KONFIRMASI BOOKING (GLASSMORPHISM) */}
          <div className={styles.panelSide}>
            <div className={styles.stickyPanel}>
              <h3 className={styles.panelTitle}>Detail Ringkasan</h3>
              
              {selectedSlot ? (
                <div className={styles.summaryDetails}>
                  <div className={styles.summaryRow}>
                    <span>Hari</span>
                    <strong>{selectedSlot.hari}</strong>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Jam Main</span>
                    <strong>{selectedSlot.waktu}</strong>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Kategori</span>
                    <strong>{selectedSlot.kategori} ({selectedSlot.durasi})</strong>
                  </div>
                  
                  <div className={styles.divider}></div>
                  
                  <button className={styles.actionBtn}>
                    Booking Sekarang &rarr;
                  </button>
                </div>
              ) : (
                <div className={styles.emptyPanel}>
                  <div className={styles.emptyIcon}>📅</div>
                  <p>Silakan pilih salah satu slot waktu yang tersedia di sebelah kiri untuk melanjutkan booking.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Booking;