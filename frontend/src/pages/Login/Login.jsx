import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import bgFotoLapangan from '../../assets/lapangandashboard.jpg';
import http from '../../utils/constant/http';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await http.post('/auth/login', { email, password });
      const result = response.data;

      if (result.token) {
        login(result.token, result.user);
        alert("Login Berhasil! Selamat datang di KickOff.");

        if (result.user?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError('Login gagal. Cek email dan password.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer} style={{ backgroundImage: `url(${bgFotoLapangan})` }}>
      <Navbar />
      <div className={styles.darkOverlay}></div>

      <div className={styles.contentWrapper}>
        <div className={styles.glassLoginCard}>

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

          <div className={styles.rightFormPanel}>
            <div className={styles.fieldSvgBg}>
              <svg viewBox="0 0 200 300" fill="none">
                <rect x="10" y="10" width="180" height="280" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" rx="4"/>
                <line x1="10" y1="150" x2="190" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <circle cx="100" cy="150" r="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              </svg>
            </div>

            {error && (
              <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '6px', marginBottom: '1rem', fontSize: '13px' }}>
                {error}
              </div>
            )}

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

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;