import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import http from "../../utils/constant/http";

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await http.get("/users");
      setUsers(res.data?.data || res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus user ini?")) return;
    try {
      await http.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) { console.error(err); }
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600" }}>Data User</h2>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: "10px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: "#f8f9fa" }}>
              {["#", "Nama", "Email", "Aksi"].map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: "600", fontSize: "12px", color: "#6c757d", borderBottom: "1px solid #e9ecef" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ padding: "2rem", textAlign: "center", color: "#6c757d" }}>Memuat data...</td></tr>
            ) : users.map((user, i) => (
              <tr key={user.id_user} style={{ borderBottom: "1px solid #f1f3f5" }}>
                <td style={{ padding: "10px 14px" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "600", color: "#1d4ed8" }}>
                      {user.nama?.charAt(0).toUpperCase()}
                    </div>
                    {user.nama}
                  </div>
                </td>
                <td style={{ padding: "10px 14px" }}>{user.email}</td>
                <td style={{ padding: "10px 14px" }}>
                  <button onClick={() => handleDelete(user.id_user)}
                    style={{ background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminUser.jsx;