import React, { useState } from 'react';
import styles from './pembayaran.module.css';

const Pembayaran = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isPatungan, setIsPatungan] = useState(false);
  const [jumlahOrang, setJumlahOrang] = useState(5);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Pilih Metode, 2: Detail Instruksi & QRIS

  // Data detail pesanan (Bisa dihubungkan ke state/context booking nanti)
  const bookingDetail = {
    invoiceId: "INV-20260701-0092",
    lapangan: "KickOff Arena A (Sintetis)",
    tanggal: "Senin, 6 Juli 2026",
    waktu: "19:00 - 20:00 WIB",
    durasi: "1 Jam",
    hargaSewa: 150000,
    biayaLayanan: 2000
  };

  const totalTagihan = bookingDetail.hargaSewa + bookingDetail.biayaLayanan;
  const hargaPerOrang = Math.ceil(totalTagihan / jumlahOrang);

  const handleProcessPayment = (e) => {
    e.preventDefault();
    if (!selectedMethod) {
      alert("Silakan pilih metode pembayaran terlebih dahulu!");
      return;
    }
    setPaymentStep(2);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.glassPaymentCard}>
          
          {/* SEKTOR KIRI: RINGKASAN TAGIHAN / INVOICE */}
          <div className={styles.leftSummaryPanel}>
            <div className={styles.headerArea}>
              <span className={styles.brandIcon}>//</span>
              <div>
                <h1 className={styles.mainTitle}>Checkout Pembayaran</h1>
                <p className={styles.invoiceId}>{bookingDetail.invoiceId}</p>
              </div>
            </div>
            
            <div className={styles.invoiceDetails}>
              <div className={styles.detailRow}>
                <span>Item Lapangan</span>
                <strong>{bookingDetail.lapangan}</strong>
              </div>
              <div className={styles.detailRow}>
                <span>Jadwal Main</span>
                <strong>{bookingDetail.tanggal}</strong>
              </div>
              <div className={styles.detailRow}>
                <span>Slot Waktu</span>
                <strong>{bookingDetail.waktu} ({bookingDetail.durasi})</strong>
              </div>
              
              <hr className={styles.divider} />
              
              <div className={styles.detailRow}>
                <span>Harga Sewa</span>
                <span>Rp {bookingDetail.hargaSewa.toLocaleString('id-ID')}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Biaya Aplikasi</span>
                <span>Rp {bookingDetail.biayaLayanan.toLocaleString('id-ID')}</span>
              </div>

              {/* FITUR PATUNGAN (SPLIT BILL AUTOMATION) */}
              <div className={styles.patunganSection}>
                <label className={styles.switchContainer}>
                  <input 
                    type="checkbox" 
                    checked={isPatungan} 
                    onChange={() => setIsPatungan(!isPatungan)} 
                  />
                  <span className={styles.sliderRound}></span>
                  <span className={styles.switchLabel}>Aktifkan Fitur Patungan (Split Bill)</span>
                </label>

                {isPatungan && (
                  <div className={styles.patunganBox}>
                    <div className={styles.inputPeopleGroup}>
                      <label>Jumlah Anggota Tim:</label>
                      <div className={styles.counterControl}>
                        <button type="button" onClick={() => setJumlahOrang(Math.max(2, jumlahOrang - 1))}>-</button>
                        <span>{jumlahOrang} Orang</span>
                        <button type="button" onClick={() => setJumlahOrang(jumlahOrang + 1)}>+</button>
                      </div>
                    </div>
                    <div className={styles.patunganResult}>
                      <span>Patungan Per Orang:</span>
                      <strong>Rp {hargaPerOrang.toLocaleString('id-ID')}</strong>
                    </div>
                  </div>
                )}
              </div>

              <hr className={styles.divider} />
              
              <div className={styles.totalRow}>
                <span>Total Bayar</span>
                <span className={styles.totalPrice}>Rp {totalTagihan.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          {/* SEKTOR KANAN: PILIHAN METODE / GERBANG PEMBAYARAN */}
          <div className={styles.rightMethodPanel}>
            {paymentStep === 1 ? (
              <>
                <h2 className={styles.sectionTitle}>Pilih Metode Pembayaran</h2>
                <form onSubmit={handleProcessPayment} className={styles.paymentForm}>
                  
                  <div className={styles.methodGroupTitle}>Virtual Account (Verifikasi Otomatis)</div>
                  <div className={styles.methodGrid}>
                    <label className={`${styles.methodLabel} ${selectedMethod === 'VA_BCA' ? styles.activeMethod : ''}`}>
                      <input type="radio" name="paymentMethod" value="VA_BCA" onChange={(e) => setSelectedMethod(e.target.value)} />
                      <div className={styles.methodText}>
                        <strong>BCA Virtual Account</strong>
                        <span>Konfirmasi otomatis instan 24 jam</span>
                      </div>
                    </label>
                    <label className={`${styles.methodLabel} ${selectedMethod === 'VA_MANDIRI' ? styles.activeMethod : ''}`}>
                      <input type="radio" name="paymentMethod" value="VA_MANDIRI" onChange={(e) => setSelectedMethod(e.target.value)} />
                      <div className={styles.methodText}>
                        <strong>Mandiri Bill Payment</strong>
                        <span>Konfirmasi otomatis instan 24 jam</span>
                      </div>
                    </label>
                  </div>

                  <div className={styles.methodGroupTitle}>E-Wallet & QRIS</div>
                  <div className={styles.methodGrid}>
                    <label className={`${styles.methodLabel} ${selectedMethod === 'QRIS' ? styles.activeMethod : ''}`}>
                      <input type="radio" name="paymentMethod" value="QRIS" onChange={(e) => setSelectedMethod(e.target.value)} />
                      <div className={styles.methodText}>
                        <strong>QRIS (Gopay, Dana, OVO, LinkAja)</strong>
                        <span>Scan kode langsung lunas otomatis</span>
                      </div>
                    </label>
                  </div>

                  <button type="submit" className={styles.payBtn}>
                    Lanjutkan Pembayaran &rarr;
                  </button>
                </form>
              </>
            ) : (
              /* LANGKAH 2: KODE BAYAR / QRIS GENERATOR */
              <div className={styles.instructionContainer}>
                <h2 className={styles.sectionTitle}>Selesaikan Pembayaran Anda</h2>
                
                {selectedMethod === 'QRIS' ? (
                  <div className={styles.qrisWrapper}>
                    <p className={styles.instructionText}>Silakan scan kode QRIS di bawah ini melalui aplikasi e-wallet pilihanmu:</p>
                    <div className={styles.qrisBox}>
                      <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.qrisSvg}>
                        <rect width="100" height="100" rx="8" fill="white"/>
                        <rect x="10" y="10" width="25" height="25" stroke="#0f172a" strokeWidth="5" fill="none"/>
                        <rect x="15" y="15" width="15" height="15" fill="#0f172a"/>
                        <rect x="65" y="10" width="25" height="25" stroke="#0f172a" strokeWidth="5" fill="none"/>
                        <rect x="70" y="15" width="15" height="15" fill="#0f172a"/>
                        <rect x="10" y="65" width="25" height="25" stroke="#0f172a" strokeWidth="5" fill="none"/>
                        <rect x="15" y="70" width="15" height="15" fill="#0f172a"/>
                        <path d="M45 15 H55 V25 H45 Z M45 35 H55 V55 H45 Z M15 45 H35 V55 H15 Z M65 45 H85 V55 H65 Z M65 65 H75 V85 H65 Z M75 75 H85 V85 H75 Z" fill="#0f172a"/>
                      </svg>
                      <span className={styles.qrisBranding}>QRIS KICKOFF GATEWAY</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.vaWrapper}>
                    <p className={styles.instructionText}>Transfer sesuai nomor Virtual Account berikut:</p>
                    <div className={styles.vaNumberBox}>
                      <span className={styles.vaNumber}>88301 0812 3456 7890</span>
                      <button className={styles.copyBtn} onClick={() => alert('Nomor VA berhasil disalin!')}>Salin</button>
                    </div>
                    <div className={styles.vaInstructions}>
                      <h4>Petunjuk Transfer:</h4>
                      <ol>
                        <li>Buka Aplikasi M-Banking pilihanmu.</li>
                        <li>Pilih Menu Transfer &gt; Virtual Account.</li>
                        <li>Masukkan nomor Virtual Account di atas.</li>
                        <li>Pastikan nominal transfer bernilai tepat <strong>Rp {totalTagihan.toLocaleString('id-ID')}</strong>.</li>
                      </ol>
                    </div>
                  </div>
                )}

                <div className={styles.countdownBox}>
                  <span>Batas Waktu Pembayaran:</span>
                  <strong className={styles.countdownTimer}>14:59</strong>
                </div>

                <div className={styles.actionButtons}>
                  <button onClick={() => setPaymentStep(1)} className={styles.backBtn}>&larr; Ubah Metode</button>
                  <button onClick={() => alert('Menghubungkan ke server untuk cek status...')} className={styles.checkStatusBtn}>Cek Status Lunas</button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pembayaran;