import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [sprints, setSprints] = useState([
    { id: 1, nama: "Sprint Weekend Pagi", durasi: "2 Jam", ketentuan: "DP minimal 50%, pembatalan maks H-1 sebelum pemakaian slot.", harga: "Rp 300.000" },
    { id: 2, nama: "Sprint Weekday Malam", durasi: "1 Jam", ketentuan: "Wajib bayar lunas di muka melalui transfer, no-refund jika batal.", harga: "Rp 150.000" }
  ]);

  return (
    <div className={styles.adminWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>KickOff App Admin</div>
        <nav className={styles.adminNav}>
          <button className={styles.activeNavLink} onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/admin/lapangan')}>Lapangan</button>
          <button onClick={() => navigate('/admin/jadwal')}>Jadwal</button>
          <button onClick={() => navigate('/admin/booking')}>Booking</button>
          <button onClick={() => navigate('/admin/user')}>User</button>
        </nav>
        <button className={styles.logoutBtn} onClick={() => navigate('/login')}>Logout</button>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Dashboard</h2>
          <div className={styles.rightHeaderGroup}>
            <div className={styles.profileCard}>
              <div className={styles.avatarCircle}>DF</div>
              <span className={styles.profileName}>Dinta Fridayanti</span>
            </div>
          </div>
        </header>

        <div className={styles.tableCard}>
          <div className={styles.tableHeaderSection}>
            <h3>Manajemen Ketentuan Sprint</h3>
            <button className={styles.addBtn}>+ Tambah Ketentuan</button>
          </div>

          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>NAMA PAKET SPRINT</th>
                <th>DURASI</th>
                <th>KETENTUAN & ATURAN</th>
                <th>HARGA SLOT</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {sprints.map((item) => (
                <tr key={item.id}>
                  <td className={styles.boldText}>{item.nama}</td>
                  <td><span className={styles.statusBadge}>{item.durasi}</span></td>
                  <td>{item.ketentuan}</td>
                  <td className={styles.priceText}>{item.harga}</td>
                  <td>
                    <div className={styles.actionGroup}>
                      <button className={styles.editBtn}>Edit</button>
                      <button className={styles.deleteBtn}>Hapus</button>
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

export default Dashboard;