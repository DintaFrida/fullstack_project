import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="section">
      <h1>Sistem Booking Lapangan</h1>
      <p>
        Selamat datang! Cari lapangan, cek jadwal, dan booking
        secara online dengan mudah.
      </p>

      <Link to="/lapangan">Lihat Daftar Lapangan →</Link>
    </div>
  );
}

export default Home;