import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/constant/http";
import styles from "./Register.module.css";

function Register() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
  });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      const payload = {
        nama:     formData.nama,
        email:    formData.email,
        password: formData.password,
        role:     "user",
      };

      const response = await http.post("/auth/register", payload);

      if (response.status === 201 || response.status === 200) {
        alert("Pendaftaran berhasil! Silakan login.");
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Gagal mendaftar. Email mungkin sudah digunakan.");
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
                Bergabung<br />Sekarang!
              </h2>
              <p className={styles.panelDesc}>
                Daftar gratis dan mulai booking lapangan futsal favoritmu.
                Mudah, cepat, dan bisa kapan saja.
              </p>
            </div>
          </div>

          {/* Panel Kanan - Form Register */}
          <div className={styles.rightPanel}>
            <div className={styles.formWrapper}>
              <div className={styles.formHeader}>
                <h1 className={styles.formTitle}>Buat Akun</h1>
                <p className={styles.formSubtitle}>
                  Sudah punya akun?{" "}
                  <Link to="/login" className={styles.formLink}>
                    Masuk di sini
                  </Link>
                </p>
              </div>

              {error && <div className={styles.errorBox}>⚠️ {error}</div>}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label className={styles.label}>Nama Lengkap</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Nama lengkap kamu"
                    autoComplete="name"
                  />
                </div>

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
                    placeholder="Minimal 6 karakter"
                    autoComplete="new-password"
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? "⏳ Memproses..." : "Daftar Sekarang →"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;