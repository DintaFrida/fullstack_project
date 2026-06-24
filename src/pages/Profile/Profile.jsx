import { useState, useEffect } from "react";
import UploadFoto from "../../components/UploadFoto/UploadFoto";
import { getBookingByUser, deleteBooking } from "../../utils/constant/bookingApi";
import styles from "./Profile.module.css";

function Profile() {
  // Ambil data user dari localStorage (disimpan saat login)
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [user] = useState({
    nama:      storedUser.nama      || storedUser.name  || "User",
    email:     storedUser.email     || "-",
    role:      storedUser.role      || "Member",
    bergabung: storedUser.createdAt
      ? new Date(storedUser.createdAt).toLocaleDateString("id-ID", { month: "long", year: "numeric" })
      : "2026",
  });

  const [activeTab, setActiveTab]   = useState("profil");
  const [riwayat, setRiwayat]       = useState([]);
  const [loadingRiwayat, setLoadingRiwayat] = useState(false);
  const [errorRiwayat, setErrorRiwayat]     = useState("");

  useEffect(() => {
    if (activeTab === "riwayat") {
      fetchRiwayat();
    }
  }, [activeTab]);

  async function fetchRiwayat() {
    try {
      setLoadingRiwayat(true);
      setErrorRiwayat("");
      const response = await getBookingByUser();
      setRiwayat(response.data.data || response.data);
    } catch (err) {
      setErrorRiwayat("Gagal memuat riwayat booking.");
      console.error(err);
    } finally {
      setLoadingRiwayat(false);
    }
  }

  async function handleBatalBooking(id) {
    if (!window.confirm("Yakin ingin membatalkan booking ini?")) return;
    try {
      await deleteBooking(id);
      setRiwayat((prev) => prev.filter((b) => b.id_booking !== id && b.id !== id));
    } catch (err) {
      alert("Gagal membatalkan booking.");
      console.error(err);
    }
  }

  return (
    <div className={styles.page}>

      {/* Hero banner */}
      <div className={styles.heroBanner}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              {user.nama.charAt(0).toUpperCase()}
            </div>
          </div>
          <h1 className={styles.heroName}>{user.nama}</h1>
          <p className={styles.heroEmail}>{user.email}</p>
          <span className={styles.heroBadge}>{user.role}</span>
        </div>
      </div>

      {/* Tab navigation */}
      <div className={styles.tabRow}>
        {["profil", "foto", "riwayat"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "profil"  && "Profil Saya"}
            {tab === "foto"    && "Foto Profil"}
            {tab === "riwayat" && "Riwayat Booking"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={styles.tabContent}>

        {/* Profil tab */}
        {activeTab === "profil" && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Informasi Akun</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nama Lengkap</span>
                <span className={styles.infoValue}>{user.nama}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{user.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Role</span>
                <span className={styles.infoValue}>
                  <span className={styles.roleBadge}>{user.role}</span>
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Bergabung Sejak</span>
                <span className={styles.infoValue}>{user.bergabung}</span>
              </div>
            </div>
          </div>
        )}

        {/* Foto tab */}
        {activeTab === "foto" && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Upload Foto Profil</h2>
            <p className={styles.cardDesc}>
              Upload foto profil kamu. Format yang didukung: JPG, PNG. Ukuran maksimal 2MB.
            </p>
            <UploadFoto />
          </div>
        )}

        {/* Riwayat tab */}
        {activeTab === "riwayat" && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Riwayat Booking</h2>

            {loadingRiwayat && (
              <p className={styles.loadingText}>Memuat riwayat booking...</p>
            )}

            {errorRiwayat && (
              <div className={styles.alertError}>
                {errorRiwayat}
                <button className={styles.retryBtn} onClick={fetchRiwayat}>
                  Coba Lagi
                </button>
              </div>
            )}

            {!loadingRiwayat && !errorRiwayat && riwayat.length === 0 && (
              <p className={styles.emptyText}>Belum ada riwayat booking.</p>
            )}

            {!loadingRiwayat && riwayat.length > 0 && (
              <div className={styles.riwayatList}>
                {riwayat.map((item) => {
                  const id       = item.id_booking || item.id;
                  const lapangan = item.lapangan?.nama_lapangan || item.nama_lapangan || "-";
                  const tanggal  = item.tanggal
                    ? new Date(item.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                    : "-";
                  const jam    = item.jam || "-";
                  const status = item.status || "aktif";

                  return (
                    <div key={id} className={styles.riwayatItem}>
                      <div className={styles.riwayatInfo}>
                        <span className={styles.riwayatId}>#{id}</span>
                        <span className={styles.riwayatLapangan}>{lapangan}</span>
                        <span className={styles.riwayatDetail}>{tanggal} — {jam}</span>
                      </div>
                      <div className={styles.riwayatActions}>
                        <span className={`${styles.riwayatBadge} ${
                          status === "aktif" ? styles.badgeAktif : styles.badgeSelesai
                        }`}>
                          {status === "aktif" ? "Aktif" : "Selesai"}
                        </span>
                        {status === "aktif" && (
                          <button
                            className={styles.btnBatal}
                            onClick={() => handleBatalBooking(id)}
                          >
                            Batalkan
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;
