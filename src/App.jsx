import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

// Halaman dengan Navbar & Footer
import Home       from "./pages/Home/Home";
import Lapangan   from "./pages/Lapangan/Lapangan";
import Jadwal     from "./pages/Jadwal/Jadwal";
import Booking    from "./pages/Booking/Booking";
import Profile    from "./pages/Profile/Profile";
import Pembayaran from "./pages/Pembayaran/Pembayaran";
import NotFound   from "./pages/NotFound/NotFound";

// Halaman Auth
import Login    from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Guard Route
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// ← TAMBAH: import kedua provider
import { AuthProvider }     from "./context/AuthContext";
import { LapanganProvider } from "./context/LapanganContext";

function App() {
  return (
    // ← TAMBAH: bungkus semua dengan provider
    <LapanganProvider>
      <AuthProvider>
        <Routes>
          {/* Halaman publik */}
          <Route path="/"           element={<Layout><Home /></Layout>} />
          <Route path="/lapangan"   element={<Layout><Lapangan /></Layout>} />
          <Route path="/jadwal"     element={<Layout><Jadwal /></Layout>} />
          <Route path="/jadwal/:id" element={<Layout><Jadwal /></Layout>} />

          {/* Halaman yang butuh login */}
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

          {/* Halaman Auth — tanpa Layout */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*"         element={<Layout><NotFound /></Layout>} />
        </Routes>
      </AuthProvider>
    </LapanganProvider>
  );
}

export default App;