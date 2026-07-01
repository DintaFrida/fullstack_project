import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';

const AdminLapangan = () => {
  const navigate = useNavigate();

  // State Simulasi Data Lapangan Sesuai Gambar
  const [lapanganList, setLapanganList] = useState([
    { id: 1, nama: "Nama Lapangan", jenis: "Futsal", harga: "350.000", status: "Tersedia" },
    { id: 2, nama: "Nama Lapangan", jenis: "Futsal", harga: "200.000", status: "Tersedia" },
    { id: 3, nama: "Nama Lapangan", jenis: "Futsal", harga: "250.000", status: "Tersedia" }
  ]);

  // Fungsi Hapus Data Lapangan
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data lapangan ini?")) {
      setLapanganList(lapanganList.filter(item => item.id !== id));
    }
  };

  return (
    <div className={styles.adminWrapper}>
      {/* Sidebar Navigasi */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>KickOff App Admin</div>
        <nav className={styles.adminNav}>
          <button onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
          <button className={styles.activeNavLink} onClick={() => navigate('/admin/lapangan')}>Lapangan</button>
          <button onClick={() => navigate('/admin/jadwal')}>Jadwal</button>
          <button onClick={() => navigate('/admin/booking')}>Booking</button>
          <button onClick={() => navigate('/admin/user')}>User</button>
        </nav>
        <button className={styles.logoutBtn} onClick={() => navigate('/login')}>
          Logout
        </button>
      </aside>

      {/* Konten Utama */}
      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Lapangan</h2>
          
          {/* Kelompok Profil Kanan Atas */}
          <div className={styles.rightHeaderGroup}>
            <div className={styles.profileCard}>
              <div className={styles.avatarCircle}>DF</div>
              <span className={styles.profileName}>Dinta Fridayanti</span>
            </div>
          </div>
        </header>

        {/* Kartu Tabel Abu-abu Transparan Gelap */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeaderSection}>
            <h3>Data Lapangan</h3>
            <button className={styles.addBtn}>+ Tambah Lapangan</button>
          </div>

          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>NAMA</th>
                <th>JENIS</th>
                <th>HARGA</th>
                <th>STATUS</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              {lapanganList.map((item) => (
                <tr key={item.id}>
                  <td className={styles.boldText}>{item.nama}</td>
                  <td>{item.jenis}</td>
                  <td className={styles.priceText}>{item.harga}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles.statusSuccess}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionGroup}>
                      <button className={styles.editBtn}>Edit</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>Hapus</button>
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

export default AdminLapangan;