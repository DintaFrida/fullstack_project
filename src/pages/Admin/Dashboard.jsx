import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import http from "../../utils/constant/http";

function Dashboard() {
  const [stats, setStats] = useState({ lapangan: 0, jadwal: 0, booking: 0, user: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [l, j, b, u] = await Promise.all([
          http.get("/lapangan"),
          http.get("/jadwal"),
          http.get("/booking"),
          http.get("/users"),
        ]);
        setStats({
          lapangan: l.data?.data?.length || l.data?.length || 0,
          jadwal:   j.data?.data?.length || j.data?.length || 0,
          booking:  b.data?.data?.length || b.data?.length || 0,
          user:     u.data?.data?.length || u.data?.length || 0,
        });
      } catch (err) {
        console.error("Gagal memuat statistik", err);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Lapangan", value: stats.lapangan, icon: "ti-building-stadium", color: "#3b82f6" },
    { label: "Total Jadwal",   value: stats.jadwal,   icon: "ti-calendar-time",    color: "#8b5cf6" },
    { label: "Total Booking",  value: stats.booking,  icon: "ti-ticket",           color: "#f59e0b" },
    { label: "Total User",     value: stats.user,     icon: "ti-users",            color: "#10b981" },
  ];

  return (
    <AdminLayout>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        {cards.map((c) => (
          <div key={c.label} style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: "10px", padding: "1.25rem" }}>
            <i className={`ti ${c.icon}`} style={{ fontSize: "24px", color: c.color }}></i>
            <p style={{ fontSize: "12px", color: "#6c757d", margin: "8px 0 4px" }}>{c.label}</p>
            <p style={{ fontSize: "28px", fontWeight: "600" }}>{c.value}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default Dashboard;