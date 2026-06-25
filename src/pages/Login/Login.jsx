import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/constant/http";
import styles from "./Login.module.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Email dan password wajib diisi!");
      setLoading(false);
      return;
    }

    try {
      const response = await http.post("/auth/login", formData);
      const result   = response.data;

      if (result.token) {
        // Simpan token dan data user ke localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user || result.data || {}));
        navigate("/");
      } else {
        setError("Token tidak ditemukan dalam respons server.");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Gagal masuk. Periksa koneksi atau akun Anda.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>

      {/* Auth Navbar Mini */}
      <div className={styles.authNav}>
        <Link to="/" className={styles.authNavLogo}>KickOff</Link>
        <Link to="/" className={styles.authNavBack}>← Kembali ke Beranda</Link>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.card}>

          {/* Panel Kiri */}
          <div className={styles.leftPanel}>
            <div className={styles.panelDecor}>
              <div className={styles.circle1} />
              <div className={styles.circle2} />
            </div>
            <div className={styles.panelContent}>
              <div className={styles.panelLogo}>KickOff</div>
              <h2 className={styles.panelTitle}>
                Selamat Datang<br />Kembali!
              </h2>
              <p className={styles.panelDesc}>
                Masuk untuk booking lapangan, cek jadwal,
                dan kelola pemesananmu.
              </p>
            </div>
          </div>

          {/* Panel Kanan */}
          <div className={styles.rightPanel}>
            <div className={styles.formWrapper}>
              <div className={styles.formHeader}>
                <h1 className={styles.formTitle}>Masuk</h1>
                <p className={styles.formSubtitle}>
                  Belum punya akun?{" "}
                  <Link to="/register" className={styles.formLink}>
                    Daftar di sini
                  </Link>
                </p>
              </div>

              {error && <div className={styles.errorBox}>{error}</div>}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="nama@email.com"
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Masuk"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
