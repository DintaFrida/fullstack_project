import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import http from "../../utils/constant/http";

function AdminLogin() {
  const { adminLogin } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await http.post("/admin/login", formData); // sesuaikan endpoint
      const result = response.data;

      if (result.token) {
        adminLogin(result.token);
        navigate("/admin/dashboard");
      } else {
        setError("Login gagal. Cek email dan password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal login, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
      <div style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: "12px", padding: "2rem", width: "100%", maxWidth: "380px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>Admin Login</h1>
        <p style={{ fontSize: "13px", color: "#6c757d", marginBottom: "1.5rem" }}>Masuk ke panel administrator</p>

        {error && (
          <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: "6px", padding: "10px 12px", fontSize: "13px", color: "#dc3545", marginBottom: "1rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "4px" }}>Email</label>
            <input
              type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="admin@example.com"
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #dee2e6", borderRadius: "6px", fontSize: "14px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", marginBottom: "4px" }}>Password</label>
            <input
              type="password" name="password" value={formData.password}
              onChange={handleChange} placeholder="••••••••"
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #dee2e6", borderRadius: "6px", fontSize: "14px" }}
              required
            />
          </div>

          <button
            type="submit" disabled={loading}
            style={{ width: "100%", padding: "10px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "500", cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Memproses..." : "Masuk sebagai Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;