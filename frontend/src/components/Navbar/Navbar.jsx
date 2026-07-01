import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { token, user, logout } = useContext(AuthContext);
  const isLoggedIn = !!token;

  // Mencari nama user secara dinamis dari berbagai kemungkinan nama field dari backend
  const namaLengkap = user?.nama || user?.name || user?.username || "User";
  const inisialHuruf = namaLengkap.charAt(0).toUpperCase();

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  // Link menu utama di bagian tengah navbar
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/lapangan", label: "Lapangan" },
    { to: "/jadwal", label: "Jadwal" },
    { to: "/booking", label: "Booking" },
  ];

  function handleLogout() {
    logout();
    navigate("/login");
    setMenuOpen(false);
  }

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.navbar}>
        
        {/* Sektor Kiri: Logo */}
        <Link to="/" className={styles.logo}>
          KickOff
        </Link>

        {/* Sektor Tengah: Links (Desktop) */}
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

        {/* Sektor Kanan: Kontrol Autentikasi */}
        <div className={styles.authGroup}>
          {isLoggedIn ? (
            <div className={styles.loggedInWrapper}>
              <Link to="/profile" className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  {user?.profilePic ? (
                    <img src={user.profilePic} alt="Profile" className={styles.avatarImg} />
                  ) : (
                    inisialHuruf
                  )}
                </div>
                <span className={styles.userName}>{namaLengkap}</span>
              </Link>
              <button className={styles.btnLogout} onClick={handleLogout}>
                Keluar
              </button>
            </div>
          ) : (
            <div className={styles.guestGroup}>
              <Link to="/login" className={styles.btnLogin}>Masuk</Link>
              <Link to="/register" className={styles.btnRegister}>Daftar</Link>
            </div>
          )}
        </div>

        {/* Hamburger Menu (Mobile Only) */}
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

      {/* Dropdown Menu Mobile */}
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
          {isLoggedIn && (
            <Link to="/profile" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
              Profile Saya
            </Link>
          )}
          <div className={styles.mobileDivider} />
          {isLoggedIn ? (
            <div className={styles.mobileUserArea}>
              <span className={styles.mobileUserText}>Halo, {namaLengkap}</span>
              <button className={styles.mobileBtnLogout} onClick={handleLogout}>
                Keluar
              </button>
            </div>
          ) : (
            <div className={styles.mobileAuthButtons}>
              <Link to="/login" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Masuk</Link>
              <Link to="/register" className={styles.mobileLinkRegister} onClick={() => setMenuOpen(false)}>Daftar</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;