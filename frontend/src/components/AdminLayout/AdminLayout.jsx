import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./AdminLayout.module.css";

function AdminLayout({ children }) {
  const { adminLogout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  const navItems = [
    { path: "/admin/dashboard", icon: "ti-layout-dashboard", label: "Dashboard" },
    { path: "/admin/lapangan", icon: "ti-building-stadium", label: "Lapangan" },
    { path: "/admin/jadwal", icon: "ti-calendar-time", label: "Jadwal" },
    { path: "/admin/booking", icon: "ti-ticket", label: "Booking" },
    { path: "/admin/user", icon: "ti-users", label: "User" },
  ];

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Booking App</h2>
          <p>Admin Panel</p>
        </div>

        <nav className={styles.nav}>
          <span className={styles.navSection}>Menu</span>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ""}`}
            >
              <i className={`ti ${item.icon}`}></i>
              {item.label}
            </Link>
          ))}
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <i className="ti ti-logout"></i> Logout
        </button>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <span className={styles.pageTitle}>
            {navItems.find((n) => n.path === location.pathname)?.label || "Admin"}
          </span>
          <div className={styles.topRight}>
            <span className={styles.badge}>Admin</span>
            <div className={styles.avatar}>A</div>
          </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;