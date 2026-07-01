import { useState, useEffect } from "react";
import styles from "./JadwalList.module.css";
import { getJadwal } from "../../../../src/utils/constant/jadwalApi";

function JadwalList() {
  // State untuk menyimpan data jadwal dari API
  const [jadwal, setJadwal]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // Fetch jadwal hanya saat komponen pertama kali di-mount
  useEffect(() => {
    fetchJadwal();
  }, []);

  async function fetchJadwal() {
    try {
      setLoading(true);
      setError(null);

      const response = await getJadwal();
      setJadwal(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Memuat jadwal...</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h2>Jadwal Booking</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Lapangan</th>
            <th>Nama Pemesan</th>
            <th>Tanggal</th>
            <th>Jam Mulai</th>
            <th>Jam Selesai</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jadwal.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.lapangan?.nama_lapangan || item.lapangan_id}</td>
              <td>{item.nama_pemesan}</td>
              <td>{item.tanggal}</td>
              <td>{item.jam_mulai}</td>
              <td>{item.jam_selesai}</td>
              <td>
                <span
                  className={
                    item.status === "confirmed"
                      ? styles.status__confirmed
                      : styles.status__pending
                  }
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JadwalList;