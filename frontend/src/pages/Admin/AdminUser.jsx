import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../utils/constant/http";
import styles from "./Dashboard.module.css";

const AdminUser = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await http.get("/auth/users");
      setUserList(res.data.data || res.data || []);
    } catch (err) {
      console.error("Gagal fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus user ini?")) return;
    try {
      await http.delete(`/auth/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Gagal hapus user:", err);
      alert("Gagal menghapus user.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className={styles.adminWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          KickOff<br />
          <span>Admin Panel</span>
        </div>
        <nav className={styles.adminNav}>
          <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/admin/lapangan")}>Lapangan</button>
          <button onClick={() => navigate("/admin/jadwal")}>Jadwal</button>
          <button onClick={() => navigate("/admin/booking")}>Booking</button>
          <button className={styles.activeNavLink} onClick={() => navigate("/admin/user")}>User</button>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>User</h2>
          <div className={styles.profileCard}>
            <div className={styles.avatarCircle}>A</div>
            <span className={styles.profileName}>Admin</span>
          </div>
        </header>

        <div className={styles.tableCard}>
          <div className={styles.tableHeaderSection}>
            <h3>Daftar Pengguna Sistem</h3>
            <button className={styles.addBtn} onClick={fetchUsers}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={{ padding: "1rem", color: "#94a3b8" }}>Memuat data...</p>
          ) : userList.length === 0 ? (
            <p style={{ padding: "1rem", color: "#94a3b8" }}>Belum ada data user.</p>
          ) : (
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((item, index) => (
                  <tr key={item.id_user}>
                    <td>{index + 1}</td>
                    <td className={styles.boldText}>{item.nama}</td>
                    <td>{item.email}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${
                        item.role === "admin" ? styles.statusConfirmed : styles.statusPending
                      }`}>
                        {item.role}
                      </span>
                    </td>
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(item.id_user)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminUser;