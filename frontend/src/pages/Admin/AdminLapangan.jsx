import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../utils/constant/http";
import styles from "./Dashboard.module.css";

const AdminLapangan = () => {
  const navigate = useNavigate();
  const [lapanganList, setLapanganList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    nama_lapangan: "",
    jenis_lapangan: "",
    harga_per_jam: "",
    status: "tersedia",
  });

  useEffect(() => {
    fetchLapangan();
  }, []);

  const fetchLapangan = async () => {
    try {
      setLoading(true);
      const res = await http.get("/lapangan");
      setLapanganList(res.data.data || []);
    } catch (err) {
      console.error("Gagal fetch lapangan:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditData(null);
    setFormData({ nama_lapangan: "", jenis_lapangan: "", harga_per_jam: "", status: "tersedia" });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditData(item);
    setFormData({
      nama_lapangan: item.nama_lapangan,
      jenis_lapangan: item.jenis_lapangan,
      harga_per_jam: item.harga_per_jam,
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
        await http.put(`/lapangan/${editData.id_lapangan}`, formData);
      } else {
        await http.post("/lapangan", {
          ...formData,
          harga_per_jam: Number(formData.harga_per_jam),
        });
      }
      setShowModal(false);
      fetchLapangan();
    } catch (err) {
      console.error("Gagal simpan lapangan:", err);
      alert("Gagal menyimpan data lapangan.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus lapangan ini?")) return;
    try {
      await http.delete(`/lapangan/${id}`);
      fetchLapangan();
    } catch (err) {
      console.error("Gagal hapus lapangan:", err);
      alert("Gagal menghapus lapangan.");
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
          <button className={styles.activeNavLink} onClick={() => navigate("/admin/lapangan")}>Lapangan</button>
          <button onClick={() => navigate("/admin/jadwal")}>Jadwal</button>
          <button onClick={() => navigate("/admin/booking")}>Booking</button>
          <button onClick={() => navigate("/admin/user")}>User</button>
        </nav>
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <h2>Lapangan</h2>
          <div className={styles.profileCard}>
            <div className={styles.avatarCircle}>A</div>
            <span className={styles.profileName}>Admin</span>
          </div>
        </header>

        <div className={styles.tableCard}>
          <div className={styles.tableHeaderSection}>
            <h3>Data Lapangan</h3>
            <button className={styles.addBtn} onClick={handleOpenAdd}>
              + Tambah Lapangan
            </button>
          </div>

          {loading ? (
            <p style={{ padding: "1rem", color: "#94a3b8" }}>Memuat data...</p>
          ) : lapanganList.length === 0 ? (
            <p style={{ padding: "1rem", color: "#94a3b8" }}>Belum ada data lapangan.</p>
          ) : (
            <table className={styles.adminTable}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Jenis</th>
                  <th>Harga / Jam</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {lapanganList.map((item, index) => (
                  <tr key={item.id_lapangan}>
                    <td>{index + 1}</td>
                    <td className={styles.boldText}>{item.nama_lapangan}</td>
                    <td>{item.jenis_lapangan || "-"}</td>
                    <td className={styles.priceText}>
                      Rp {Number(item.harga_per_jam).toLocaleString("id-ID")}
                    </td>
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
                        <button className={styles.deleteBtn} onClick={() => handleDelete(item.id_lapangan)}>Hapus</button>
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
            <h3>{editData ? "Edit Lapangan" : "Tambah Lapangan"}</h3>
            <div className={styles.modalForm}>
              <div className={styles.inputGroup}>
                <label>Nama Lapangan</label>
                <input
                  name="nama_lapangan"
                  value={formData.nama_lapangan}
                  onChange={handleChange}
                  placeholder="Contoh: Lapangan A"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Jenis Lapangan</label>
                <input
                  name="jenis_lapangan"
                  value={formData.jenis_lapangan}
                  onChange={handleChange}
                  placeholder="Contoh: Futsal"
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Harga per Jam</label>
                <input
                  name="harga_per_jam"
                  type="number"
                  value={formData.harga_per_jam}
                  onChange={handleChange}
                  placeholder="Contoh: 100000"
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

export default AdminLapangan;