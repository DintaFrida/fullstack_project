import React, { useState } from 'react';
import styles from './Login.module.css';

// 1. IMPORT NAVBAR GLOBAL KAMU (Sesuaikan path folder navbar jika berbeda)
import Navbar from '../../components/Navbar/Navbar'; 

// 2. IMPORT FOTO BACKGROUND YANG SAMA SEPERTI DI HOME
import bgFotoLapangan from '../../assets/lapangandashboard.jpg'; 

const Login = () => {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('***********');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login dengan:', email);
  };

  return (
    // Container utama pembungkus seluruh halaman
    <div className={styles.pageContainer} style={{ backgroundImage: `url(${bgFotoLapangan})` }}>
      
      {/* TAMPILKAN NAVBAR DI ATAS AGAR TIDAK KOSONGAN */}
      <Navbar />

      {/* Overlay Gelap pembungkus latar belakang */}
      <div className={styles.darkOverlay}></div>

      {/* Konten Form yang posisinya otomatis turun di bawah Navbar */}
      <div className={styles.contentWrapper}>
        
        <div className={styles.glassLoginCard}>
          
          {/* SEKTOR KIRI: TEKS SELAMAT DATANG */}
          <div className={styles.leftBrandPanel}>
            <div className={styles.logoWrapper}>
              <span className={styles.brandIcon}>//</span>
              <span className={styles.logoText}>KickOff</span>
            </div>
            
            <h1 className={styles.welcomeTitle}>Selamat Datang<br />Kembali!</h1>
            <p className={styles.welcomeDesc}>
              Masuk untuk booking lapangan, cek jadwal, dan kelola pemesananmu dengan mudah dan cepat.
            </p>
          </div>

          {/* SEKTOR KANAN: INPUT FORM & WATERMARK LAPANGAN SAMAR */}
          <div className={styles.rightFormPanel}>
            
            <div className={styles.fieldSvgBg}>
              <svg viewBox="0 0 200 300" fill="none">
                <rect x="10" y="10" width="180" height="280" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" rx="4"/>
                <line x1="10" y1="150" x2="190" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <circle cx="100" cy="150" r="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              </svg>
            </div>

            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  className={styles.inputField}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input 
                  type="password" 
                  className={styles.inputField}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                Masuk
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;