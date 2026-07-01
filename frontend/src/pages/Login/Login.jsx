import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

// Import AuthContext Global untuk mengaktifkan status login
import { AuthContext } from '../../context/AuthContext'; 

// Import Navbar Global
import Navbar from '../../components/Navbar/Navbar'; 

// Import Foto Background Lapangan
import bgFotoLapangan from '../../assets/lapangandashboard.jpg'; 

const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Mencoba login dengan:', email);
      
      // 1. Jalankan fungsi login dari AuthContext kamu
      let loggedInUser = null;
      if (auth && typeof auth.login === 'function') {
        loggedInUser = await auth.login(email, password);
      } else if (auth && typeof auth.setIsAuthenticated === 'function') {
        auth.setIsAuthenticated(true);
      }
      
      alert("Login Berhasil! Selamat datang di KickOff.");
      
      // 2. LOGIKA REDIRECT: Cek apakah yang login adalah Admin atau User Biasa
      if (email === "admin@kickoff.com" || loggedInUser?.role === "admin" || loggedInUser?.user?.role === "admin") {
        // Jika email admin atau role terdeteksi admin, arahkan ke dashboard admin
        navigate('/admin/dashboard'); 
      } else {
        // Jika user biasa, arahkan ke halaman utama/home
        navigate('/'); 
      }
      
    } catch (error) {
      console.error("Login Error:", error);
      alert("Email atau password salah / Gagal terhubung ke server!");
    }
  };

  return (
    <div className={styles.pageContainer} style={{ backgroundImage: `url(${bgFotoLapangan})` }}>
      {/* Navbar di atas background */}
      <Navbar />
      <div className={styles.darkOverlay}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.glassLoginCard}>
          
          {/* SEKTOR KIRI: Branding Panel */}
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

          {/* SEKTOR KANAN: Form Input */}
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