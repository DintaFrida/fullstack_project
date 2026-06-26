import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import http from "../../utils/constant/http";

function AdminJadwal() {
  const [jadwal, setJadwal] = useState([]);
  const [lapangan, setLapangan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({ id_lapangan: "", tanggal: "", jam_mulai: "", jam_selesai: "" });

  const fetchJadwal = async () => {
    try {
      const res = await http.get("/jadwal");
      setJadwal(res.data?.data || res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchLapangan = async () => {
    try {
      const res = await http.get("/lapangan");
      setLapangan(res.data?.data || res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchJadwal(); fetchLapangan(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await http.put(`/jadwal/${editData.id_jadwal}`, formData);
      } else {
        await http.post("/jadwal", formData);
      }
      setShowModal(false);
      setEditData(null);
      setFormData({ id_lapangan: "", tanggal: "", jam_mulai: "", jam_selesai: "" });
      fetchJadwal();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData({ id_lapangan: item.id_lapangan, tanggal: item.tanggal?.split("T")[0], jam_mulai: item.jam_mulai, jam_selesai: item.jam_selesai });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus jadwal ini?")) return;
    try {
      await http.delete(`/jadwal/${id}`);
      fetchJadwal();
    } catch (err) { console.error(err); }
  };

  const modalStyle = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 };
  const cardStyle = { background: "#fff", borderRadius: "12px", padding: "1.5rem", width: "100%", maxWidth: "420px" };
  const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #dee2e6", borderRadius: "6px", fontSize: "14px", marginTop: "4px" };
  const labelStyle = { fontSize: "13px", fontWeight: "500", display: "block", marginBottom: "12px" };

  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600" }}>Data Jadwal</h2>
        <button onClick={() => { setShowModal(true); setEditData(null); setFormData({ id_lapangan: "", tanggal: "", jam_mulai: "", jam_selesai: "" }); }}
          style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 14px", fontSize: "13px", cursor: "pointer" }}>
          + Tambah Jadwal
        </button>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              {["#", "Lapangan", "Tanggal", "Jam Mulai", "Jam Selesai", "Aksi"].map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: "600", fontSize: "12px", color: "#6c757d", borderBottom: "1px solid #e9ecef" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: "2rem", textAlign: "center", color: "#6c757d" }}>Memuat data...</td></tr>
            ) : jadwal.map((item, i) => (
              <tr key={item.id_jadwal} style={{ borderBottom: "1px solid #f1f3f5" }}>
                <td style={{ padding: "10px 14px" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px" }}>{item.nama_lapangan}</td>
                <td style={{ padding: "10px 14px" }}>{item.tanggal?.split("T")[0]}</td>
                <td style={{ padding: "10px 14px" }}>{item.jam_mulai}</td>
                <td style={{ padding: "10px 14px" }}>{item.jam_selesai}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => handleEdit(item)}
                      style={{ background: "#fef3c7", color: "#92400e", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id_jadwal)}
                      style={{ background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={modalStyle}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "1rem" }}>{editData ? "Edit Jadwal" : "Tambah Jadwal"}</h3>
            <form onSubmit={handleSubmit}>
              <label style={labelStyle}>Lapangan
                <select name="id_lapangan" value={formData.id_lapangan} onChange={handleChange} style={inputStyle} required>
                  <option value="">Pilih Lapangan</option>
                  {lapangan.map((l) => (
                    <option key={l.id_lapangan} value={l.id_lapangan}>{l.nama_lapangan}</option>
                  ))}
                </select>
              </label>
              <label style={labelStyle}>Tanggal
                <input name="tanggal" type="date" value={formData.tanggal} onChange={handleChange} style={inputStyle} required />
              </label>
              <label style={labelStyle}>Jam Mulai
                <input name="jam_mulai" type="time" value={formData.jam_mulai} onChange={handleChange} style={inputStyle} required />
              </label>
              <label style={labelStyle}>Jam Selesai
                <input name="jam_selesai" type="time" value={formData.jam_selesai} onChange={handleChange} style={inputStyle} required />
              </label>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button type="button" onClick={() => setShowModal(false)}
                  style={{ padding: "8px 14px", border: "1px solid #dee2e6", borderRadius: "6px", background: "#fff", cursor: "pointer", fontSize: "13px" }}>
                  Batal
                </button>
                <button type="submit"
                  style={{ padding: "8px 14px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
                  {editData ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminJadwal;