import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

// Halaman dengan Navbar & Footer
import Home       from "./pages/Home/Home";
import Lapangan   from "./pages/Lapangan/Lapangan";
import Jadwal     from "./pages/Jadwal/Jadwal";
import Booking    from "./pages/Booking/Booking";
import Profile    from "./pages/Profile/Profile";
import Pembayaran from "./pages/Pembayaran/pembayaran"; 
import NotFound   from "./pages/NotFound/NotFound";

// Halaman Auth
import Login    from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Guard Route
import PrivateRoute        from "../../src/components/PrivateRoute/PrivateRoute";
import ProtectedAdminRoute from "../../src/components/ProtectedRoute/ProtectedAdminRoute";

// Context
import { AuthProvider }     from "./context/AuthContext";
import { LapanganProvider } from "./context/LapanganContext";

// Halaman Admin
import AdminLogin    from "./pages/Admin/AdminLogin";
import Dashboard     from "./pages/Admin/Dashboard"; // Menimpa Dashboard lama untuk manajemen Ketentuan Sprint
import AdminLapangan from "./pages/Admin/AdminLapangan";
import AdminJadwal   from "./pages/Admin/AdminJadwal";
import AdminBooking  from "./pages/Admin/AdminBooking";
import AdminUser     from "./pages/Admin/AdminUser";

function App() {
  return (
    <LapanganProvider>
      <AuthProvider>
        <Routes>
          {/* ===== Halaman publik ===== */}
          <Route path="/"           element={<Layout><Home /></Layout>} />
          <Route path="/lapangan"   element={<Layout><Lapangan /></Layout>} />
          <Route path="/jadwal"     element={<Layout><Jadwal /></Layout>} />
          <Route path="/jadwal/:id" element={<Layout><Jadwal /></Layout>} />

          {/* ===== Halaman yang butuh login ===== */}
          <Route path="/booking" element={
            <PrivateRoute>
              <Layout><Booking /></Layout>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Layout><Profile /></Layout>
            </PrivateRoute>
          } />
          <Route path="/pembayaran" element={
            <PrivateRoute>
              <Layout><Pembayaran /></Layout>
            </PrivateRoute>
          } />

          {/* ===== Halaman Auth ===== */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ===== Halaman Admin ===== */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/lapangan" element={
            <ProtectedAdminRoute>
              <AdminLapangan />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/jadwal" element={
            <ProtectedAdminRoute>
              <AdminJadwal />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/booking" element={
            <ProtectedAdminRoute>
              <AdminBooking />
            </ProtectedAdminRoute>
          } />
          <Route path="/admin/user" element={
            <ProtectedAdminRoute>
              <AdminUser />
            </ProtectedAdminRoute>
          } />

          {/* ===== 404 ===== */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </AuthProvider>
    </LapanganProvider>
  );
}

export default App;