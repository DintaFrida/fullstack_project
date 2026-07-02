import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../utils/constant/http";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalLapangan: 0,
    totalBooking: 0,
    totalUser: 0,
    totalJadwal: 0,
  });
  const [recentBooking, setRecentBooking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [lapanganRes, bookingRes, jadwalRes] = await Promise.all([
        http.get("/lapangan"),
        http.get("/booking"),
        http.get("/jadwal"),
      ]);

      const lapangan = lapanganRes.data.data || [];
      const booking  = bookingRes.data.data  || [];
      const jadwal   = jadwalRes.data.data   || [];

      setStats({
        totalLapangan: lapangan.length,
        totalBooking:  booking.length,
        totalJadwal:   jadwal.length,
        totalUser:     0,
      });

      setRecentBooking(booking.slice(0, 5));
    } catch (err) {
      console.error("Gagal fetch dashboard:", err);
    } finally {
      setLoading(false);
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
    if (s === "confirmed" || s === "selesai" || s === "lunas") return styles.statusConfirmed;
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
          <button className={styles.activeNavLink} onClick={() => navigate("/admin/dashboard")}>
            Dashboard
          </button>
          <button onClick={() => navigate("/admin/lapangan")}>
            Lapangan
          </button>
          <button onClick={() => navigate("/admin/jadwal")}>
            Jadwal
          </button>
          <button onClick={() => navigate("/admin/booking")}>
            Booking
          </button>
          <button onClick={() => navigate("/admin/user")}>
            User
          </button>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Dashboard</h2>
          <div className={styles.profileCard}>
            <div className={styles.avatarCircle}>A</div>
            <span className={styles.profileName}>Admin</span>
          </div>
        </header>

        {loading ? (
          <p style={{ padding: "2rem", color: "#94a3b8" }}>Memuat data...</p>
        ) : (
          <>
            {/* Stats Cards */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.statLabel}>Total Lapangan</p>
                  <h3 className={styles.statNum}>{stats.totalLapangan}</h3>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.statLabel}>Total Booking</p>
                  <h3 className={styles.statNum}>{stats.totalBooking}</h3>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.statLabel}>Total Jadwal</p>
                  <h3 className={styles.statNum}>{stats.totalJadwal}</h3>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <p className={styles.statLabel}>Total User</p>
                  <h3 className={styles.statNum}>{stats.totalUser}</h3>
                </div>
              </div>
            </div>

            {/* Recent Booking */}
            <div className={styles.tableCard}>
              <div className={styles.tableHeaderSection}>
                <h3>Booking Terbaru</h3>
                <button
                  className={styles.addBtn}
                  onClick={() => navigate("/admin/booking")}
                >
                  Lihat Semua
                </button>
              </div>

              {recentBooking.length === 0 ? (
                <p style={{ padding: "1rem", color: "#94a3b8" }}>
                  Belum ada data booking.
                </p>
              ) : (
                <table className={styles.adminTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ID Lapangan</th>
                      <th>ID Jadwal</th>
                      <th>Tanggal</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBooking.map((item) => (
                      <tr key={item.id_booking}>
                        <td className={styles.boldText}>#{item.id_booking}</td>
                        <td>{item.id_lapangan || "-"}</td>
                        <td>{item.id_jadwal || "-"}</td>
                        <td>{formatTanggal(item.tanggal || item.created_at)}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${getStatusClass(item.status)}`}>
                            {item.status || "menunggu"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;