import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';

const AdminJadwal = () => {
  const navigate = useNavigate();

  const [jadwalList] = useState([
    { id: 1, jam: "08:00 - 10:00", tipe: "Pagi", tarif: "Rp 150.000", kondisi: "Tersedia" },
    { id: 2, jam: "19:00 - 21:00", tipe: "Malam", tarif: "Rp 300.000", kondisi: "Penuh" }
  ]);

  return (
    <div className={styles.adminWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>KickOff App Admin</div>
        <nav className={styles.adminNav}>
          <button onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/admin/lapangan')}>Lapangan</button>
          <button className={styles.activeNavLink} onClick={() => navigate('/admin/jadwal')}>Jadwal</button>
          <button onClick={() => navigate('/admin/booking')}>Booking</button>
          <button onClick={() => navigate('/admin/user')}>User</button>
        </nav>
        <button className={styles.logoutBtn} onClick={() => navigate('/login')}>Logout</button>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Jadwal</h2>
          <div className={styles.rightHeaderGroup}>
            <div className={styles.profileCard}>
              <div className={styles.avatarCircle}>DF</div>
              <span className={styles.profileName}>Dinta Fridayanti</span>
            </div>
          </div>
        </header>

        <div className={styles.tableCard}>
          <div className={styles.tableHeaderSection}>
            <h3>Pengaturan Slot Waktu</h3>
            <button className={styles.addBtn}>+ Tambah Jam</button>
          </div>

          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>JAM OPERASIONAL</th>
                <th>KATEGORI</th>
                <th>TARIF DASAR</th>
                <th>KONDISI SLOT</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {jadwalList.map((j) => (
                <tr key={j.id}>
                  <td className={styles.boldText}>{j.jam}</td>
                  <td>{j.tipe}</td>
                  <td className={styles.priceText}>{j.tarif}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${j.kondisi === 'Tersedia' ? styles.statusSuccess : styles.statusDanger}`}>
                      {j.kondisi}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionGroup}>
                      <button className={styles.editBtn}>Ubah</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminJadwal;