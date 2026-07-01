import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        
        <div className={styles.footerBrand}>
          <h2>KickOff</h2>
          <p>Platform booking lapangan futsal online. Mudah, cepat, dan bisa kapan saja.</p>
        </div>

        <div className={styles.footerLinks}>
          <h3>Menu</h3>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/lapangan">Lapangan</a></li>
            <li><a href="/jadwal">Jadwal</a></li>
            <li><a href="/booking">Booking</a></li>
          </ul>
        </div>

        <div className={styles.footerLinks}>
          <h3>Akun</h3>
          <ul>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/login">Masuk</a></li>
            <li><a href="/register">Daftar</a></li>
          </ul>
        </div>

      </div>

      <div className={styles.footerCopyright}>
        &copy; 2026 KickOff. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;