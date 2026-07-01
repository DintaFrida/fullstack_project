import { useState, useEffect } from "react";
import LapanganCard from "./LapanganCard";
import styles from "./LapanganList.module.css";
import { getLapangan } from "../../utils/constant/lapanganApi";

function LapanganList() {
  const [lapangan, setLapangan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLapangan();
  }, []);

  async function fetchLapangan() {
    try {
      setLoading(true);
      setError(null);

      const response = await getLapangan();

      setLapangan(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Memuat data lapangan...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <section>
        <h2>Daftar Lapangan</h2>

        <div className={styles.lapangan__container}>
          {lapangan.map((item) => (
            <LapanganCard
              key={item.id}
              lapangan={item}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default LapanganList;