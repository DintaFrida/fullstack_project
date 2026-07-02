import React, { useState, useEffect, useContext } from 'react';
import styles from './Booking.module.css';
import lapanganImg from '../../assets/lapangandashboard.jpg';
import http from '../../utils/constant/http';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [jadwal, setJadwal] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const res = await http.get('/jadwal');
        setJadwal(res.data?.data || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJadwal();
  }, []);

  const handleBooking = async () => {
    if (!selectedSlot) return;
    setSubmitting(true);
    try {
      await http.post('/booking', {
        id_user: token ? JSON.parse(atob(token.split('.')[1])).id : null,
        id_jadwal: selectedSlot.id_jadwal,
        tanggal_booking: new Date().toISOString().split('T')[0],
        status: 'menunggu'
      });
      alert('Booking berhasil!');
      navigate('/pembayaran'); // ← diubah dari '/' ke '/pembayaran'
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal booking, coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
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

      <div className={styles.shadowTransition}></div>

      <section className={styles.bookingContainer}>
        <div className={styles.bookingLayout}>

          <div className={styles.scheduleSide}>
            <h2 className={styles.sideTitle}>Pilih Slot Waktu</h2>
            {loading ? (
              <p>Memuat jadwal...</p>
            ) : (
              <div className={styles.slotGrid}>
                {jadwal.map((slot) => (
                  <div
                    key={slot.id_jadwal}
                    className={`${styles.slotCard} ${selectedSlot?.id_jadwal === slot.id_jadwal ? styles.slotSelected : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    <div className={styles.slotHeader}>
                      <span className={styles.slotDay}>{slot.nama_lapangan}</span>
                      <span className={styles.txtTersedia}>Tersedia</span>
                    </div>
                    <div className={styles.slotTime}>{slot.jam_mulai} - {slot.jam_selesai}</div>
                    <div className={styles.slotFooter}>
                      <span>{slot.tanggal?.split('T')[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.panelSide}>
            <div className={styles.stickyPanel}>
              <h3 className={styles.panelTitle}>Detail Ringkasan</h3>
              {selectedSlot ? (
                <div className={styles.summaryDetails}>
                  <div className={styles.summaryRow}>
                    <span>Lapangan</span>
                    <strong>{selectedSlot.nama_lapangan}</strong>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Tanggal</span>
                    <strong>{selectedSlot.tanggal?.split('T')[0]}</strong>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Jam</span>
                    <strong>{selectedSlot.jam_mulai} - {selectedSlot.jam_selesai}</strong>
                  </div>
                  <div className={styles.divider}></div>
                  <button
                    className={styles.actionBtn}
                    onClick={handleBooking}
                    disabled={submitting}
                  >
                    {submitting ? 'Memproses...' : 'Booking Sekarang →'}
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