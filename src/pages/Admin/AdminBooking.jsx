import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import http from "../../utils/constant/http";

function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await http.get("/booking");
      setBookings(res.data?.data || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleApprove = async (id) => {
    try {
      await http.put(`/booking/${id}`, { status: "disetujui" }); // sesuaikan endpoint
      fetchBookings();
    } catch (err) { console.error(err); }
  };

  const handleReject = async (id) => {
    try {
      await http.put(`/booking/${id}`, { status: "ditolak" });
      fetchBookings();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus booking ini?")) return;
    try {
      await http.delete(`/booking/${id}`);
      fetchBookings();
    } catch (err) { console.error(err); }
  };

  const pillStyle = (status) => {
    if (status === "disetujui") return { background: "#d1fae5", color: "#065f46" };
    if (status === "ditolak")   return { background: "#fee2e2", color: "#991b1b" };
    return { background: "#fef3c7", color: "#92400e" };
  };

  return (
    <AdminLayout>
      <div style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              {["#", "User", "Lapangan", "Jadwal", "Status", "Aksi"].map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: "600", fontSize: "12px", color: "#6c757d", borderBottom: "1px solid #e9ecef" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ padding: "2rem", textAlign: "center", color: "#6c757d" }}>Memuat data...</td></tr>
            ) : bookings.map((b, i) => (
              <tr key={b.id} style={{ borderBottom: "1px solid #f1f3f5" }}>
                <td style={{ padding: "10px 14px" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px" }}>{b.user?.name || b.user_id}</td>
                <td style={{ padding: "10px 14px" }}>{b.lapangan?.nama || b.lapangan_id}</td>
                <td style={{ padding: "10px 14px" }}>{b.jadwal?.waktu || b.jadwal_id}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ ...pillStyle(b.status), fontSize: "11px", padding: "3px 10px", borderRadius: "999px", fontWeight: "500" }}>
                    {b.status || "menunggu"}
                  </span>
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => handleApprove(b.id)} title="Setujui"
                      style={{ background: "#d1fae5", color: "#065f46", border: "none", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", fontSize: "12px" }}>
                      <i className="ti ti-check"></i>
                    </button>
                    <button onClick={() => handleReject(b.id)} title="Tolak"
                      style={{ background: "#fef3c7", color: "#92400e", border: "none", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", fontSize: "12px" }}>
                      <i className="ti ti-x"></i>
                    </button>
                    <button onClick={() => handleDelete(b.id)} title="Hapus"
                      style={{ background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", fontSize: "12px" }}>
                      <i className="ti ti-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminBooking;