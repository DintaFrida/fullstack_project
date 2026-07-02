import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../utils/constant/http";
import styles from "./Dashboard.module.css";

const AdminBooking = () => {
  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const res = await http.get("/booking");
      setBookingList(res.data.data || []);
    } catch (err) {
      console.error("Gagal fetch booking:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await http.put(`/booking/${id}`, { status });
      fetchBooking();
    } catch (err) {
      console.error("Gagal update status:", err);
      alert("Gagal mengupdate status booking.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin membatalkan booking ini?")) return;
    try {
      await http.delete(`/booking/${id}`);
      fetchBooking();
    } catch (err) {
      console.error("Gagal hapus booking:", err);
      alert("Gagal membatalkan booking.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    if (!status) return styles.statusPending;
    const s = status.toLowerCase();
    if (s === "confirmed" || s === "disetujui" || s === "selesai") return styles.statusConfirmed;
    if (s === "cancelled" || s === "dibatalkan") return styles.statusCancelled;
    return styles.statusPending;
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
          <button className={styles.activeNavLink} onClick={() => navigate("/admin/booking")}>Booking</button>
          <button onClick={() => navigate("/admin/user")}>User</button>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Booking</h2>
          <div className={styles.profileCard}>
            <div className={styles.avatarCircle}>A</div>
            <span className={styles.profileName}>Admin</span>
          </div>
        </header>

        <div className={styles.tableCard}>
          <div className={styles.tableHeaderSection}>
            <h3>Data Booking Masuk</h3>
            <button className={styles.addBtn} onClick={fetchBooking}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p style={{ padding: "1rem", color: "#94a3b8" }}>Memuat data...</p>
          ) : bookingList.length === 0 ? (
            <p style={{ padding: "1rem", color: "#94a3b8" }}>Belum ada data booking.</p>
          ) : (
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID User</th>
                  <th>ID Lapangan</th>
                  <th>ID Jadwal</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bookingList.map((item, index) => (
                  <tr key={item.id_booking}>
                    <td>{index + 1}</td>
                    <td>{item.id_user || "-"}</td>
                    <td>{item.id_lapangan || "-"}</td>
                    <td>{item.id_jadwal || "-"}</td>
                    <td>{formatTanggal(item.tanggal || item.created_at)}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusClass(item.status)}`}>
                        {item.status || "menunggu"}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        {item.status !== "confirmed" && (
                          <button
                            className={styles.editBtn}
                            onClick={() => handleUpdateStatus(item.id_booking, "confirmed")}
                          >
                            Setujui
                          </button>
                        )}
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(item.id_booking)}
                        >
                          Batalkan
                        </button>
                      </div>
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

export default AdminBooking;