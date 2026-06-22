import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

// Halaman dengan Navbar & Footer
import Home from "./pages/Home/Home";
import Lapangan from "./pages/Lapangan/Lapangan";
import Jadwal from "./pages/Jadwal/Jadwal";
import Booking from "./pages/Booking/Booking";
import Profile from "./pages/Profile/Profile";

// Halaman Auth
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/lapangan" element={<Layout><Lapangan /></Layout>} />
      <Route path="/jadwal" element={<Layout><Jadwal /></Layout>} />
      <Route path="/booking" element={<Layout><Booking /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;