import { createContext, useState, useEffect } from "react";
import http from "../utils/constant/http";

export const LapanganContext = createContext();

export const LapanganProvider = ({ children }) => {
  const [lapangan, setLapangan] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchLapangan = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await http.get("/lapangan");
      setLapangan(response.data.data || response.data);
    } catch (err) {
      setError(err.message || "Gagal memuat data lapangan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLapangan();
  }, []);

  return (
    <LapanganContext.Provider value={{ lapangan, fetchLapangan, loading, error }}>
      {children}
    </LapanganContext.Provider>
  );
};