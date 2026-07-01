import React, { useState } from 'react';
import styles from './Register.module.css';
import Navbar from '../../components/Navbar/Navbar'; 
import bgFotoLapangan from '../../assets/lapangandashboard.jpg'; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State untuk toggle sembunyikan/tampilkan password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }
    console.log('Mendaftar dengan:', formData);
  };

  return (
    <div className={styles.pageContainer} style={{ backgroundImage: `url(${bgFotoLapangan})` }}>
      <Navbar />
      <div className={styles.darkOverlay}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.glassRegisterCard}>
          
          {/* KOLOM KIRI */}
          <div className={styles.leftBrandPanel}>
            <div className={styles.logoWrapper}>
              <span className={styles.brandIcon}>//</span>
              <span className={styles.logoText}>KickOff</span>
            </div>
            <h1 className={styles.welcomeTitle}>Bergabung<br />Sekarang!</h1>
            <p className={styles.welcomeDesc}>
              Daftar gratis dan mulai booking lapangan futsal favoritmu dengan mudah. Cukup satu akun untuk semua pesanan.
            </p>
          </div>

          {/* KOLOM KANAN */}
          <div className={styles.rightFormPanel}>
            
            {/* Ornamen Taktis Lapangan yang Mempercantik Sisi Kanan */}
            <div className={styles.fieldSvgBg}>
              <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="190" height="290" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" rx="8"/>
                <line x1="5" y1="150" x2="195" y2="150" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <circle cx="100" cy="150" r="35" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <path d="M 5 60 A 45 45 0 0 0 50 15 L 5 15 Z" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none"/>
                <path d="M 195 60 A 45 45 0 0 1 150 15 L 195 15 Z" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none"/>
                <path d="M 5 240 A 45 45 0 0 1 50 285 L 5 285 Z" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none"/>
                <path d="M 195 240 A 45 45 0 0 0 150 285 L 195 285 Z" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>

            <form onSubmit={handleSubmit} className={styles.registerForm}>
              <div className={styles.inputGroup}>
                <input 
                  type="text" 
                  name="name"
                  className={styles.inputField}
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input 
                  type="email" 
                  name="email"
                  className={styles.inputField}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Input Password + Ikon Mata */}
              <div className={styles.inputGroupRelative}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  className={styles.inputField}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button 
                  type="button" 
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>

              {/* Input Konfirmasi Password + Ikon Mata */}
              <div className={styles.inputGroupRelative}>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  name="confirmPassword"
                  className={styles.inputField}
                  placeholder="Konfirmasi Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button 
                  type="button" 
                  className={styles.eyeButton}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Daftar &rarr;
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;