import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../utils/constant/http";
import styles from "./Dashboard.module.css";

const AdminJadwal = () => {
  const navigate = useNavigate();
  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    id_lapangan: "",
    jam_mulai: "",
    jam_selesai: "",
    status: "tersedia",
  });

  useEffect(() => {
    fetchJadwal();
  }, []);

  const fetchJadwal = async () => {
    try {
      setLoading(true);
      const res = await http.get("/jadwal");
      setJadwalList(res.data.data || []);
    } catch (err) {
      console.error("Gagal fetch jadwal:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditData(null);
    setFormData({ id_lapangan: "", jam_mulai: "", jam_selesai: "", status: "tersedia" });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditData(item);
    setFormData({
      id_lapangan: item.id_lapangan,
      jam_mulai: item.jam_mulai,
      jam_selesai: item.jam_selesai,
      status: item.status || "tersedia",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editData) {
        await http.put(`/jadwal/${editData.id_jadwal}`, formData);
      } else {
        await http.post("/jadwal", formData);
      }
      setShowModal(false);
      fetchJadwal();
    } catch (err) {
      console.error("Gagal simpan jadwal:", err);
      alert("Gagal menyimpan data jadwal.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus jadwal ini?")) return;
    try {
      await http.delete(`/jadwal/${id}`);
      fetchJadwal();
    } catch (err) {
      console.error("Gagal hapus jadwal:", err);
      alert("Gagal menghapus jadwal.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className={styles.adminWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          KickOff<br />
          <span>Admin Panel</span>
        </div>
        <nav className={styles.adminNav}>
          <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/admin/lapangan")}>Lapangan</button>
          <button className={styles.activeNavLink} onClick={() => navigate("/admin/jadwal")}>Jadwal</button>
          <button onClick={() => navigate("/admin/booking")}>Booking</button>
          <button onClick={() => navigate("/admin/user")}>User</button>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Jadwal</h2>
          <div className={styles.profileCard}>
            <div className={styles.avatarCircle}>A</div>
            <span className={styles.profileName}>Admin</span>
          </div>
        </header>

        <div className={styles.tableCard}>
          <div className={styles.tableHeaderSection}>
            <h3>Pengaturan Slot Waktu</h3>
            <button className={styles.addBtn} onClick={handleOpenAdd}>
              + Tambah Jadwal
            </button>
          </div>

          {loading ? (
            <p style={{ padding: "1rem", color: "#94a3b8" }}>Memuat data...</p>
          ) : jadwalList.length === 0 ? (
            <p style={{ padding: "1rem", color: "#94a3b8" }}>Belum ada data jadwal.</p>
          ) : (
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID Lapangan</th>
                  <th>Jam Mulai</th>
                  <th>Jam Selesai</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {jadwalList.map((item, index) => (
                  <tr key={item.id_jadwal}>
                    <td>{index + 1}</td>
                    <td>{item.id_lapangan || "-"}</td>
                    <td className={styles.boldText}>{item.jam_mulai || "-"}</td>
                    <td>{item.jam_selesai || "-"}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${
                        item.status === "tersedia" ? styles.statusConfirmed : styles.statusCancelled
                      }`}>
                        {item.status || "tersedia"}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionGroup}>
                        <button className={styles.editBtn} onClick={() => handleOpenEdit(item)}>Edit</button>
                        <button className={styles.deleteBtn} onClick={() => handleDelete(item.id_jadwal)}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal Tambah / Edit */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3>{editData ? "Edit Jadwal" : "Tambah Jadwal"}</h3>
            <div className={styles.modalForm}>
              <div className={styles.inputGroup}>
                <label>ID Lapangan</label>
                <input
                  name="id_lapangan"
                  type="number"
                  value={formData.id_lapangan}
                  onChange={handleChange}
                  placeholder="Contoh: 1"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Jam Mulai</label>
                <input
                  name="jam_mulai"
                  type="time"
                  value={formData.jam_mulai}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Jam Selesai</label>
                <input
                  name="jam_selesai"
                  type="time"
                  value={formData.jam_selesai}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "12px",
                    borderRadius: "8px",
                    color: "white",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <option value="tersedia" style={{ background: "#1e293b" }}>Tersedia</option>
                  <option value="penuh" style={{ background: "#1e293b" }}>Penuh</option>
                </select>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>Batal</button>
              <button className={styles.submitBtn} onClick={handleSubmit}>
                {editData ? "Simpan Perubahan" : "Tambah"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJadwal;