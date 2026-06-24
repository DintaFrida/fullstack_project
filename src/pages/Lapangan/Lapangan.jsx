import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLapangan } from "../../utils/constant/lapanganApi";
import styles from "./Lapangan.module.css";

function Lapangan() {
  const [lapangan, setLapangan] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [filter, setFilter]     = useState("semua");
  const [search, setSearch]     = useState("");

  useEffect(() => {
    fetchLapangan();
  }, []);

  async function fetchLapangan() {
    try {
      setLoading(true);
      setError("");
      const response = await getLapangan();
      setLapangan(response.data.data || response.data);
    } catch (err) {
      setError("Gagal memuat data lapangan. Coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = lapangan
    .filter((l) => filter === "semua" || l.status === filter)
    .filter((l) =>
      search.trim() === "" ||
      l.nama_lapangan?.toLowerCase().includes(search.toLowerCase()) ||
      l.jenis_lapangan?.toLowerCase().includes(search.toLowerCase())
    );

  const tersedia = lapangan.filter((l) => l.status === "tersedia").length;

  if (loading) {
    return (
      <div className={styles.stateBox}>
        <p>Memuat data lapangan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateBox}>
        <p>{error}</p>
        <button className={styles.retryBtn} onClick={fetchLapangan}>
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Sewa Lapangan Futsal</span>
          <h1 className={styles.heroTitle}>Pilih Lapangan Terbaik</h1>
          <p className={styles.heroDesc}>
            Cek ketersediaan dan booking lapangan futsalmu secara online.
          </p>

          {/* Search bar */}
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Cari nama atau jenis lapangan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.searchClear} onClick={() => setSearch("")}>x</button>
            )}
          </div>

          {/* Stats */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{lapangan.length}</span>
              <span className={styles.statLabel}>Total Lapangan</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNum}>{tersedia}</span>
              <span className={styles.statLabel}>Tersedia</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNum}>{lapangan.length - tersedia}</span>
              <span className={styles.statLabel}>Penuh</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className={styles.contentSection}>

        {/* Filter pills */}
        <div className={styles.filterRow}>
          {["semua", "tersedia", "penuh"].map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "semua"    && "Semua"}
              {f === "tersedia" && "Tersedia"}
              {f === "penuh"    && "Penuh"}
            </button>
          ))}
          <span className={styles.filterCount}>{filtered.length} lapangan ditemukan</span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className={styles.stateBox}>
            <p>Tidak ada lapangan yang cocok.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((lap) => (
              <div
                key={lap.id_lapangan}
                className={`${styles.card} ${lap.status === "penuh" ? styles.cardDimmed : ""}`}
              >
                {/* Card Image */}
                <div className={styles.cardImg}>
                  <div className={styles.cardImgOverlay} />
                  <div className={styles.cardImgContent}>
                    <h3 className={styles.cardImgName}>{lap.nama_lapangan}</h3>
                    <span className={`${styles.cardBadge} ${lap.status === "tersedia" ? styles.available : styles.full}`}>
                      {lap.status === "tersedia" ? "Tersedia" : "Penuh"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  <div className={styles.typeRow}>
                    <span className={styles.typeTag}>{lap.jenis_lapangan}</span>
                    {lap.kapasitas && (
                      <span className={styles.kapasitasTag}>{lap.kapasitas}</span>
                    )}
                  </div>

                  {/* Fasilitas */}
                  {lap.fasilitas && lap.fasilitas.length > 0 && (
                    <div className={styles.fasilitasRow}>
                      {lap.fasilitas.map((f) => (
                        <span key={f} className={styles.fasilitasTag}>{f}</span>
                      ))}
                    </div>
                  )}

                  {/* Price */}
                  <div className={styles.priceRow}>
                    <span className={styles.priceLabel}>Harga sewa</span>
                    <p className={styles.cardPrice}>
                      Rp {Number(lap.harga_per_jam).toLocaleString("id-ID")}
                      <span> / jam</span>
                    </p>
                  </div>

                  {/* Button */}
                  {lap.status === "tersedia" ? (
                    <Link to={`/jadwal/${lap.id_lapangan}`} className={styles.cardBtn}>
                      Lihat Jadwal & Booking
                    </Link>
                  ) : (
                    <button className={`${styles.cardBtn} ${styles.cardBtnDisabled}`} disabled>
                      Tidak Tersedia
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Lapangan;
