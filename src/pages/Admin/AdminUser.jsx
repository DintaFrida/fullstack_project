import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';

const AdminUser = () => {
  const navigate = useNavigate();

  const [users] = useState([
    { id: 1, nama: "Dinta Fridayanti", email: "dinta@kickoff.com", role: "Admin" },
    { id: 2, nama: "Ahmad Subarjo", email: "subarjo@gmail.com", role: "Member" }
  ]);

  return (
    <div className={styles.adminWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>KickOff App Admin</div>
        <nav className={styles.adminNav}>
          <button onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/admin/lapangan')}>Lapangan</button>
          <button onClick={() => navigate('/admin/jadwal')}>Jadwal</button>
          <button onClick={() => navigate('/admin/booking')}>Booking</button>
          <button className={styles.activeNavLink} onClick={() => navigate('/admin/user')}>User</button>
        </nav>
        <button className={styles.logoutBtn} onClick={() => navigate('/login')}>Logout</button>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>User</h2>
          <div className={styles.rightHeaderGroup}>
            <div className={styles.profileCard}>
              <div className={styles.avatarCircle}>DF</div>
              <span className={styles.profileName}>Dinta Fridayanti</span>
            </div>
          </div>
        </header>

        <div className={styles.tableCard}>
          <div className={styles.tableHeaderSection}>
            <h3>Daftar Pengguna Sistem</h3>
          </div>

          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>NAMA USER</th>
                <th>ALAMAT EMAIL</th>
                <th>HAK AKSES / ROLE</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className={styles.boldText}>{u.nama}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={styles.statusBadge}>{u.role}</span>
                  </td>
                  <td>
                    <button className={styles.deleteBtn}>Blokir</button>
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

export default AdminUser;