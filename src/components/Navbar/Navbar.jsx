import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navLinks = [
    { to: "/",         label: "Home" },
    { to: "/lapangan", label: "Lapangan" },
    { to: "/jadwal",   label: "Jadwal" },
    { to: "/booking",  label: "Booking" },
    { to: "/profile",  label: "Profile" },
  ];

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.navbar}>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          Booking Futsal
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

        {/* Auth buttons */}
        <div className={styles.authGroup}>
          <Link to="/login" className={styles.btnLogin}>Masuk</Link>
          <Link to="/register" className={styles.btnRegister}>Daftar</Link>
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
          <Link to="/login" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Masuk</Link>
          <Link to="/register" className={styles.mobileLinkRegister} onClick={() => setMenuOpen(false)}>Daftar</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
