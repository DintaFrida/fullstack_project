import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';

const AdminBooking = () => {
  const navigate = useNavigate();

  const [bookings] = useState([
    { id: 1, user: "Dinta Fridayanti", lapangan: "Lapangan A (Vinyil)", jadwal: "01 Juli 2026 / 19:00", status: "Disetujui" },
    { id: 2, user: "Ahmad Subarjo", lapangan: "Lapangan B (Sintetis)", jadwal: "02 Juli 2026 / 16:00", status: "Menunggu" }
  ]);

  return (
    <div className={styles.adminWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>KickOff App Admin</div>
        <nav className={styles.adminNav}>
          <button onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/admin/lapangan')}>Lapangan</button>
          <button onClick={() => navigate('/admin/jadwal')}>Jadwal</button>
          <button className={styles.activeNavLink} onClick={() => navigate('/admin/booking')}>Booking</button>
          <button onClick={() => navigate('/admin/user')}>User</button>
        </nav>
        <button className={styles.logoutBtn} onClick={() => navigate('/login')}>Logout</button>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Booking</h2>
          <div className={styles.rightHeaderGroup}>
            <div className={styles.profileCard}>
              <div className={styles.avatarCircle}>DF</div>
              <span className={styles.profileName}>Dinta Fridayanti</span>
            </div>
          </div>
        </header>

        <div className={styles.tableCard}>
          <div className={styles.tableHeaderSection}>
            <h3>Data Booking Masuk</h3>
          </div>

          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>USER</th>
                <th>LAPANGAN</th>
                <th>JADWAL SLOT</th>
                <th>STATUS</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td className={styles.boldText}>{b.user}</td>
                  <td>{b.lapangan}</td>
                  <td>{b.jadwal}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${b.status === 'Disetujui' ? styles.statusSuccess : styles.statusWarning}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionGroup}>
                      <button className={styles.editBtn}>Setujui</button>
                      <button className={styles.deleteBtn}>Batalkan</button>
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

export default AdminBooking;