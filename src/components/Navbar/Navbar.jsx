import { useState, useContext } from "react";  // ← tambah useContext
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../context/AuthContext";  // ← tambah import

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ← GANTI: ambil dari context, bukan localStorage langsung
  const { token, user, logout } = useContext(AuthContext);
  const isLoggedIn = !!token;

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navLinks = [
    { to: "/",         label: "Home" },
    { to: "/lapangan", label: "Lapangan" },
    { to: "/jadwal",   label: "Jadwal" },
    { to: "/booking",  label: "Booking" },
    { to: "/profile",  label: "Profile" },
  ];

  // ← GANTI: cukup panggil logout() dari context
  function handleLogout() {
    logout();
    navigate("/login");
    setMenuOpen(false);
  }

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.navbar}>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          KickOff
        </Link>

        {/* Links — desktop */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`${styles.navLink} ${isActive(link.to) ? styles.navLinkActive : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth group — desktop */}
        <div className={styles.authGroup}>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {(user?.nama || user?.name || "U").charAt(0).toUpperCase()}
                </div>
                <span className={styles.userName}>
                  {user?.nama || user?.name || "User"}
                </span>
              </Link>
              <button className={styles.btnLogout} onClick={handleLogout}>
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link to="/login"    className={styles.btnLogin}>Masuk</Link>
              <Link to="/register" className={styles.btnRegister}>Daftar</Link>
            </>
          )}
        </div>

        {/* Hamburger — mobile */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barTop : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barMid : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBot : ""}`} />
        </button>

      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`${styles.mobileLink} ${isActive(link.to) ? styles.mobileLinkActive : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileDivider} />
          {isLoggedIn ? (
            <>
              <div className={styles.mobileUser}>
                Halo, <strong>{user?.nama || user?.name || "User"}</strong>
              </div>
              <button className={styles.mobileLinkLogout} onClick={handleLogout}>
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                Masuk
              </Link>
              <Link to="/register" className={styles.mobileLinkRegister} onClick={() => setMenuOpen(false)}>
                Daftar
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;