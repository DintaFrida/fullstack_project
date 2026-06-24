import { useState } from "react";
import UploadFoto from "../../components/UploadFoto/UploadFoto";
import styles from "./Profile.module.css";

function Profile() {
  const [user] = useState({
    nama: "Eshi Aulia",
    email: "eshi@gmail.com",
    role: "Member",
    bergabung: "Juni 2026",
  });

  const [activeTab, setActiveTab] = useState("profil");

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
            <div className={styles.riwayatList}>
              {[
                { id: "BK001", lapangan: "Lapangan A", tanggal: "20 Jun 2026", jam: "19:00 - 20:00", status: "selesai" },
                { id: "BK002", lapangan: "Lapangan C", tanggal: "22 Jun 2026", jam: "18:00 - 19:00", status: "aktif" },
              ].map((item) => (
                <div key={item.id} className={styles.riwayatItem}>
                  <div className={styles.riwayatInfo}>
                    <span className={styles.riwayatId}>{item.id}</span>
                    <span className={styles.riwayatLapangan}>{item.lapangan}</span>
                    <span className={styles.riwayatDetail}>{item.tanggal} — {item.jam}</span>
                  </div>
                  <span className={`${styles.riwayatBadge} ${item.status === "aktif" ? styles.badgeAktif : styles.badgeSelesai}`}>
                    {item.status === "aktif" ? "Aktif" : "Selesai"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;
